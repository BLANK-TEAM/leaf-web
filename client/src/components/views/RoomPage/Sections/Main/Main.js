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
    Divider,
    Alert 
} from 'antd';
import Dropzone from 'react-dropzone'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import { connect, useDispatch } from 'react-redux'
import { getRoomComments, afterPostPost, deletePost } from '../../../../../_actions/comments_actions'
import { getRoomContent } from '../../../../../_actions/rooms_actions'
import io from 'socket.io-client'

import PostItem from './PostItem'
import Axios from 'axios';

const { Panel } = Collapse;

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
        let comments = []

        this.socket.emit('Create Post', {
            author,
            content,
            room,
            comments
        })

        this.setState({ content: "", status: true })
        setTimeout(() => {
            window.location.reload();
        }, 500)
    }

    renderComments = () => {
        return this.state.posts.map((post) => (
            <PostItem key={post._id} post={post} />
        ))
    }

    onDrop = (files) => {
        console.log(files)
        let formData = new FormData

        let config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append('file', files[0])

        Axios.post('/upload', formData, config)
            .then((res) => console.log(res))
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
                                    <Dropzone onDrop={this.onDrop}>
                                        {({getRootProps, getInputProps}) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <Button block>
                                                        <UploadOutlined />
                                                    </Button>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <div style={{marginTop: '0.5rem'}}>
                                        <Button 
                                            type="primary" 
                                            htmlType="submit"
                                            onClick={this.submit}
                                            style={{float: 'right', marginLeft: '0.5rem'}}
                                        >
                                            POST
                                        </Button>
                                        <Button style={{float: 'right'}}>
                                            Cancel
                                        </Button>
                                    </div>
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
