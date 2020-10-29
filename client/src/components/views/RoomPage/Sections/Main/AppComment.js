import React from 'react'
import { 
    Comment, 
    Avatar,
    List,
    Form,
    Input,
    Button,
    Tooltip,
    Collapse
} from 'antd';
import moment from 'moment'
import { SendOutlined, CaretRightOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { afterPostComment, getComments } from '../../../../../_actions/post_comments_action'
import Axios from 'axios';
  
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
      comments: []
    };

    componentDidMount() {
        Axios.get(`/api/postComments/${this.props.post._id}`)
          .then((res) => {
            this.setState({
              comments: res.data
            })
          })
        this.props.socket.on('Output Post Comment', data => {
          this.state.comments.concat(data)
          setTimeout(() => {
            window.location.reload()
          }, 500)
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

    renderComments = () => 
        this.state.comments.map((comment) => (
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