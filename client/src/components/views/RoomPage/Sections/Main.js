import React, { Component, useState, useEffect } from 'react'
import { UploadOutlined, SendOutlined } from '@ant-design/icons'
import { 
    Row,
    Col,
    Collapse, 
    Button, 
    Form, 
    Input, 
    Comment, 
    Tooltip, 
    Avatar,
    Divider,
    Alert 
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import { connect, useDispatch } from 'react-redux'
import { getRoomComments, afterPostPost, deletePost } from '../../../../_actions/comments_actions'
import { getRoomContent } from '../../../../_actions/rooms_actions'
import io from 'socket.io-client'

const { Panel } = Collapse;

let socket;
let server = 'http://localhost:5000'

const Post = props => {
    const [message, setMessage] = useState("")
    const [id, setId] = useState("")

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
            roomId: props.post._id
        })
        dispatch(deletePost(props.post))
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
                        <Comment 
                            author={<a>{props.post.author.name}</a>}
                            content={
                                <p>
                                    {props.post.content}
                                </p>
                            }
                            avatar={
                                <Avatar 
                                    src="https://i.pinimg.com/280x280_RS/29/6a/29/296a29f0a31ddc96ea4995be70ef3f05.jpg"
                                />
                            }
                            datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(props.post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </Tooltip>
                            }
                        />
                    <Divider />
                    
                    <div 
                        style={{
                            display: 'flex', 
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Button onClick={submitDeletePost} style={{marginRight: '0.5rem'}}>
                            <DeleteOutlined />
                        </Button>
                        <Button>
                            <EditOutlined />
                        </Button>
                    </div>
    
                    {/* <Form style={{padding: '1rem'}}>
                        <Form.Item
                            name="comment"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">
                                <SendOutlined />
                            </Button>
                        </Form.Item>
                    </Form> */}
    
                </div>
            </div>
    )
}

export class Main extends Component {

    state = {
        roomId: "",
        content: "",
        posts: [],
        status: false
    }

    onContentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    componentDidMount() {
        let server = "http://localhost:5000"

        let length = window.location.pathname.length
        let key = window.location.pathname.substring(6, length)

        this.props.dispatch(getRoomContent(key))
            .then((res) => {
                this.setState({
                    roomId: res.payload._id
                })
            })
            .then(() => {
                this.props.dispatch(getRoomComments(this.state.roomId)).then((posts) => {
                    this.setState({
                        posts: posts.payload.reverse()
                    })
                })
            })

        this.socket = io(server)

        this.socket.on('Output Post', post => {
            this.props.dispatch(afterPostPost(post))
            console.log(post)
        })
    }

    submit = (e) => {
        e.preventDefault()

        let author = this.props.user.userData._id
        let content = this.state.content
        let room = this.props.state.roomId

        this.socket.emit('Create Comment', {
            author,
            content,
            room
        })

        this.setState({ content: "", status: true })
        setTimeout(() => {
            window.location.reload();
        }, 500)
    }

    renderComments = () => {
        return this.state.posts.map((post) => (
            <Post key={post._id} post={post} />
        ))
    }

    render() {
        return (
            <>
            <div 
                style={{
                    width: '90%', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '0.5rem',
                    margin: '0 auto',
                    height: '10rem',
                    marginTop: '1rem'
                }}>
                <h3 style={{padding: '1rem'}}>{this.props.state.roomName}</h3>
            </div>
            <Collapse
                style={{
                    width: '90%',
                    margin: '0 auto',
                    marginTop: '1rem'
                }}
            >
                <Panel header="Share something...">
                    {this.state.status 
                    ? <Alert 
                        message="Successfully added..." 
                        type="success" 
                        style={{marginBottom: '0.5rem'}}
                    />
                    : null}
                    <Form onSubmit={this.submit}>
                        <Form.Item>
                            <Input.TextArea 
                                onChange={this.onContentChange} 
                                value={this.state.content}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button>
                                <UploadOutlined /> Add
                            </Button>
                            <Button 
                                style={{float: 'right'}} 
                                type="primary" 
                                htmlType="submit"
                                onClick={this.submit}
                            >
                                POST
                            </Button>
                            <Button style={{float: 'right', marginRight: '0.5rem'}}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
            <div>
                {this.props.comment && (
                    <div>{this.renderComments()}</div>
                )}
            </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        comment: state.comment
    }
}

export default connect(mapStateToProps)(Main)
