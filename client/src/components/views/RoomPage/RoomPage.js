import React, { Component } from 'react'
import { Row, Col, List, Icon, Input, Form, Button, Comment } from 'antd'
import { connect } from 'react-redux'
import { getRoomContent } from '../../../_actions/rooms_actions'
import io from 'socket.io-client'

class RoomPage extends Component {
    
    state = {
        message: "",
        roomName: "",
        subject: "",
        users: undefined
    }

    componentDidMount() {
        let length = window.location.pathname.length
        let key = window.location.pathname.substring(6, length)

        this.props.dispatch(getRoomContent(key))
            .then((res) => {
                this.setState({
                    roomName: res.payload.name,
                    users: res.payload.users,
                    subject: res.payload.subject
                })
            })
    }

    onMessageChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        return (
            <div style={{marginTop: '2rem'}}>
                <Row justify="center">
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <h3>Room Name:</h3>
                        <h2>{this.state.roomName}</h2>
                        <h3>Users:</h3>
                            <List
                                dataSource={this.state.users}
                                renderItem={item => (
                                    <List.Item>
                                        {item.name}
                                    </List.Item>
                            )}
                        />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <div style={{margin: '0 auto'}}>
                            <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
                                <Comment 
                                    author={<a>Geddoku</a>}
                                    content={
                                        <p>Hello ~~~</p>
                                    }
                                />
                            </div>
    
                            <Row>
                                <Form layout="inline">
                                    <Col span={18}>
                                        <Input 
                                            id="message"
                                            prefix={<Icon type="message" style={{ color: 'rgba(0, 0, 0, ..25'}} />}
                                            type="text"
                                            value={this.message}
                                            onChange={this.onMessageChange}
                                        />
                                    </Col>
                                    <Col span={2}>
    
                                    </Col>
                                    <Col span={4}>
                                        <Button type="primary" style={{width: '100%'}} htmlType="submit">
                                            <Icon type="enter" />
                                        </Button>
                                    </Col>
                                </Form>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        {this.state.subject}
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        room: state.room
    }
}

export default connect(mapStateToProps)(RoomPage)