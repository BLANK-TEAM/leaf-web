import React, { Component } from 'react'
import { Row, Col, List, Icon, Input, Form, Button } from 'antd'
import io from 'socket.io-client'

const data = [
  'Geddoku',
  'Oleiniik',
  'Fish'
];

class ChatPage extends Component {
    
    state = {
        message: ""
    }

    onMessageChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <Row justify="center">
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <h3>Room Name:</h3>
                        <h2>Math</h2>
                        <h3>Users:</h3>
                            <List
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        {item}
                                    </List.Item>
                            )}
                        />
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <div style={{margin: '0 auto'}}>
                            <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
                                <div>Message</div>
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
                        Ext. Info
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ChatPage