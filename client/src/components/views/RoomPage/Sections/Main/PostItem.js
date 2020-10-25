import React, { useState, useEffect } from 'react'
import { 
    Modal,
    Col,
    Collapse, 
    Button, 
    Form, 
    Input, 
    Comment, 
    Tooltip, 
    Avatar,
    Divider,
    Alert,
    List 
} from 'antd';
import { 
    DeleteOutlined, 
    EditOutlined, 
    CommentOutlined,
    SendOutlined 
} from '@ant-design/icons'
import moment from 'moment'
import { connect, useDispatch } from 'react-redux'
import { deletePost } from '../../../../../_actions/comments_actions'
import io from 'socket.io-client'

const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
      <Form.Item style={{width: '90%'}}>
        <Input onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="default">
            <SendOutlined />
        </Button>
      </Form.Item>
    </div>
  );
  
  class AppComment extends React.Component {
    state = {
      comments: [],
      submitting: false,
      value: '',
    };
  
    handleSubmit = () => {
      if (!this.state.value) {
        return;
      }
  
      this.setState({
        submitting: true,
      });
  
      setTimeout(() => {
        this.setState({
          submitting: false,
          value: '',
          comments: [
            {
              author: this.props.user.userData.name,
              avatar: this.props.user.userData.image,
              content: <p>{this.state.value}</p>,
              datetime: moment().fromNow(),
            },
            ...this.state.comments,
          ],
        });
      }, 1000);
    };
  
    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };
  
    render() {
      const { comments, submitting, value } = this.state;
  
      return (
        <>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
            avatar={
              <Avatar
                src={this.props.user.userData.image}
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </>
      );
    }
  }

let socket;
let server = 'http://localhost:5000'

const PostItem = props => {
    const [message, setMessage] = useState("")
    const [id, setId] = useState("")

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const [content, setContent] = useState('')

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const dispatch = useDispatch()

    socket = io(server)

    useEffect(() => {
        socket.on('Output Delete Post', msg => {
            setMessage(msg.msg)
            setId(msg.id)
            setTimeout(() => {
                window.location.reload()
            }, 500)
        })
    }, [message])

    const submitDeletePost = () => {
        socket.emit('Delete Post', {
            postId: props.post._id
        })
        dispatch(deletePost(props.post))
    }

    const showModal = () => [
        setVisible(true)
    ]

    const handleOk = () => {
        setLoading(true)
        socket.emit('Update Post', {
            content: content,
            id: props.post._id
        })
        setTimeout(() => {
            setLoading(false)
            window.location.reload()
        }, 2000)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return (<div
                style={{
                    width: '90%',
                    margin: '0 auto',
                    marginTop: '1rem',
                    border: 'solid #f5f5f5',
                    borderRadius: '0.5rem'
                }}
            >
                {id === props.post._id 
                    ? <Alert 
                        message="Successfully deleted..." 
                        type="success" 
                        style={{padding: '1rem'}}
                    />
                    : null}
                <div style={{padding: '1rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Comment 
                                author={<a>{props.post.author.name}</a>}
                                content={
                                    <p>
                                        {props.post.content}
                                    </p>
                                }
                                avatar={
                                    <Avatar 
                                        src={props.post.author.image}
                                    />
                                }
                                datetime={
                                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        <span>{moment(props.post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                    </Tooltip>
                                }
                            />
                            <div 
                        style={{
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Button onClick={submitDeletePost} style={{marginRight: '0.5rem'}}>
                            <DeleteOutlined />
                        </Button>
                        <Button onClick={showModal}>
                            <EditOutlined />
                        </Button>
                        <Modal
                            visible={visible}
                            title={<CommentOutlined />}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                    Cancel
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                    Submit
                                </Button>
                            ]}
                        >
                            <Form onSubmit={handleOk}>
                                <Form.Item>
                                    <Input.TextArea
                                        value={content}
                                        onChange={handleContentChange}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    </div>
                    <Divider />
                    <AppComment user={props.user} />
                </div>
            </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        comment: state.comment
    }
}

export default connect(mapStateToProps)(PostItem)