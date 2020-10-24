import React, { useEffect } from 'react'
import { UploadOutlined, SendOutlined } from '@ant-design/icons'
import { 
    Collapse, 
    Button, 
    Form, 
    Input, 
    Comment, 
    Tooltip, 
    Avatar,
    Divider 
} from 'antd';
import moment from 'moment'

const { Panel } = Collapse;

function Main(props) {
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
            <h3 style={{padding: '1rem'}}>{props.state.roomName}</h3>
        </div>
        <Collapse
            style={{
                width: '90%',
                margin: '0 auto',
                marginTop: '1rem'
            }}
        >
            <Panel header="Share something...">
                <Form>
                    <Form.Item>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button>
                            <UploadOutlined /> Add
                        </Button>
                        <Button style={{float: 'right'}} type="primary" htmlType="submit">
                            POST
                        </Button>
                        <Button style={{float: 'right', marginRight: '0.5rem'}}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Panel>
        </Collapse>
        <div
            style={{
                width: '90%',
                margin: '0 auto',
                marginTop: '1rem',
                border: 'solid #f5f5f5',
                borderRadius: '0.5rem'
            }}
        >
            <div style={{padding: '1rem'}}>
                <Comment 
                    author={<a>Geddoku</a>}
                    content={
                        <p>
                            We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
                        </p>
                    }
                    avatar={
                        <Avatar 
                            src="https://i.pinimg.com/280x280_RS/29/6a/29/296a29f0a31ddc96ea4995be70ef3f05.jpg"
                        />
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                />
                <Divider />

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
        </>
    )
}

export default Main
