import React from 'react'
import { 
    Comment, 
    Avatar,
    Modal,
    Form,
    Input,
    Button,
    Tooltip,
    Collapse,
    Alert
} from 'antd';
import moment from 'moment'
import { 
  SendOutlined, 
  CaretRightOutlined, 
  DeleteOutlined, 
  EditOutlined ,
  CommentOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { afterPostComment, getComments } from '../../../../../_actions/post_comments_action'
import Axios from 'axios';

import styles from './AppComment.module.css'
  
const { Panel } = Collapse

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
      submitting: false,
      value: '',
      comments: [],
      status: false,
      message: '',
      item: '',
      visible: false,
      loading: false,
      content: ''
    };

    componentDidMount() {
        Axios.get(`/api/postComments/${this.props.post._id}`)
          .then((res) => {
            this.setState({
              comments: res.data
            })
          })
        this.props.socket.on('Output Post Comment', data => {
          this.setState({
            comments: this.state.comments.concat(data)
          })
        })
        this.props.socket.on('Output Delete Post Comment', data => {
          this.setState({
            status: data.status,
            message: data.message,
            comments: this.state.comments.filter(item => item._id !== data.comment._id)
          })
        })
    }
  
    handleSubmit = () => {
      if (!this.state.value) {
        return;
      }
  
      this.setState({
        submitting: true,
      });
  
      setTimeout(() => {
        this.props.socket.emit('Create Post Comment', {
          author: this.props.user.userData._id,
          content: this.state.value,
          post: this.props.post._id
        })

        this.setState({
          submitting: false,
          value: ''
        });
      }, 1000);
    };
  
    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };

    onEditClick = (id) => {
      console.log(id)
      this.setState({ visible: true })
      // setTimeout(() => {
      //   this.props.socket.emit('Update Post Comment', {
      //     id: id
      //   })
      // }, 500)
    }

    onDeleteClick = (id) => {
      this.setState({
        item: id
      })
      this.props.socket.emit('Delete Post Comment', {
        id
      })
    }

    handleContentChange = e => {
      this.setState({ content: e.target.value })
    }

    handleOk = e => {
      e.preventDefault()
    }

    handleCancel = e => {
      e.preventDefault()
      this.setState({ visible: false })
    }

    renderComments = () => 
        this.state.comments.map((comment) => (
          <>
              <Modal
                  title={<CommentOutlined />}
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                      <Button key="back" onClick={this.handleCancel}>
                          Cancel
                      </Button>,
                      <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                          Submit
                      </Button>
                  ]}
                >
                    <Form onSubmit={this.handleOk}>
                        <Form.Item>
                            <Input.TextArea
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            />
                        </Form.Item>
                    </Form>
              </Modal>
              {this.state.status && comment._id === this.state.item
                  ? <Alert 
                      message={this.state.message}
                      type="success" 
                    />
                  : null
              }
              <div
                style={{
                  display: 'flex', 
                  justifyContent: 'space-between'
                }}
              >
                <Comment
                    key={comment._id}
                    author={comment.author.name}
                    avatar={comment.author.image}
                    content={comment.content}
                    datetime={
                        <Tooltip>
                            <span>{moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                        </Tooltip>
                    }
                />
                <div>
                    <EditOutlined onClick={() => this.onEditClick(comment)} />
                    <DeleteOutlined style={{marginLeft: '0.5rem'}} onClick={() => this.onDeleteClick(comment._id)} />
                </div>
              </div>
          </>
        ))
  
    render() {
      const { submitting, value } = this.state;
  
      return (
        <>
            {this.state.comments  
            ? <Collapse 
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{backgroundColor: 'white'}}
              >
                <Panel header={`${this.state.comments.length} Comments`} key="1">
                    {this.renderComments()}
                </Panel>
              </Collapse>
            : null
            }
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

const mapStateToProps = state => {
    return {
        postComment: state.postComment
    }
}

export default connect(mapStateToProps)(AppComment)