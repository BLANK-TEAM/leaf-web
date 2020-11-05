import React, { Component } from 'react'
import {
    Button,
    Divider,
    Tooltip,
    Modal,
    Collapse,
    Card,
    Comment,
    List,
    Row,
    Col 
} from 'antd'
import {
    TranslationOutlined,
    HeartOutlined
} from '@ant-design/icons'
import moment from 'moment';

const { Panel } = Collapse;
const { Meta } = Card;

const data = [
    {
      author: 'Eugene Oleynik',
      avatar: 'https://i.pinimg.com/236x/29/4c/b3/294cb357c2ae3576ebd6f7c2605cc095.jpg',
      content: (
        <p>
          Not bad course!
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      author: 'Nikita Zakomorniy',
      avatar: 'https://i.pinimg.com/originals/ff/3f/aa/ff3faac6572244919cd3acd51bb50d14.jpg',
      content: (
        <p>
          I so stupid for this...i maybe go record song
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
];

export default class CoursePage extends Component {

    state = {
        visible: false,
        loading: false
    }

    handleCancel = () => {

    }

    handleOk = () => {

    }

    render() {
        return (
            <div style={{margin: '2rem'}}>
                <Tooltip title="You will learn: Nodejs, ExpressJs, MongoDB, SocketIO, Heroku">
                    <Row onClick={() => this.setState({ visible: true })} style={{display: 'flex', maxWidth: '100rem', cursor: 'pointer'}}>
                        <Col span={20}>
                            <div style={{display: 'flex'}}>
                                <img
                                    style={{
                                        borderStyle: 'solid', 
                                        borderWidth: '1px',
                                        borderRadius: '0.3rem'
                                    }}
                                    src="https://img-a.udemycdn.com/course/240x135/2041082_057e_10.jpg?DaAVdVXFodG0A75M0nj42W5tF1JSpeEEbS93r5iJBOVr0Tev7Fj1KyKG1WQNqoQhXIS3gOqsWvwDS2R1lmofs1q1d7chDi3iw_dd5ralDaAdFSzWOxsAe7-PpkFkWts"
                                />
                                <div style={{marginLeft: '0.5rem'}}>
                                    <h3 style={{fontWeight: 'bold'}}>Express JS. Practical Course</h3>
                                    <h4>Server on Express, Mongodb, Mongoose, Heroku</h4>
                                    <h4 style={{color: '#adadad'}}>Nikita Vozniuk</h4>
                                    <h4 style={{color: '#8e8e8e'}}>Total lessons: 10 · Total tasks 4</h4>
                                </div>
                            </div>
                        </Col>
                        <Col span={4}>
                            <Button style={{marginTop: '3rem'}}>
                                START
                            </Button>
                        </Col>
                    </Row>
                    <Divider />
                </Tooltip>
                <Modal
                    title="Express JS. Practical Course"
                    centered
                    visible={this.state.visible}
                    onOk={() => this.setState({ visible: false })}
                    onCancel={() => this.setState({ visible: false })}
                    width={'80%'}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          Return
                        </Button>,
                        <Button 
                            key="submit" 
                            type="primary" 
                            loading={this.state.loading} 
                            onClick={this.handleOk}
                            style={{
                                backgroundColor: '#00cf5d', 
                                borderColor: '#00cf5d'
                            }}
                        >
                          Start Course
                        </Button>,
                    ]}
                >
                    <div style={{textAlign: 'center', backgroundColor: '#f0f0f0'}}>
                        <img
                            style={{
                                borderStyle: 'solid', 
                                borderWidth: '1px',
                                borderRadius: '0.3rem',
                                marginTop: '0.5rem'
                            }}
                            src="https://img-a.udemycdn.com/course/240x135/2041082_057e_10.jpg?DaAVdVXFodG0A75M0nj42W5tF1JSpeEEbS93r5iJBOVr0Tev7Fj1KyKG1WQNqoQhXIS3gOqsWvwDS2R1lmofs1q1d7chDi3iw_dd5ralDaAdFSzWOxsAe7-PpkFkWts"
                        />
                        <div style={{marginTop: '1rem'}}>
                            <h2>Express JS. Practical Course</h2>
                            <h3>Create server on Express, Mongodb, Mongoose, Heroku</h3>
                            <h4>Authors: Nikita Vozniuk</h4>
                            <h4><TranslationOutlined /> English</h4>
                        </div>
                        <div style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'
                        }}> 
                            <Button style={{marginBottom: '0.5rem'}}>
                                Wishlist <HeartOutlined />
                            </Button>
                        </div>
                    </div>
                    <div style={{marginTop: '0.5rem'}}>
                        <div style={{textAlign: 'center'}}>
                            <h2>Course Materials</h2>
                            <h4>· 10 lections</h4>
                        </div>
                        <Collapse style={{backgroundColor: '#f5f5f5'}} defaultActiveKey={['1']}>
                            <Panel header="Beginning" key="1">
                                <p>1st lesson</p>
                            </Panel>
                            <Panel header="Express js" key="2">
                                <p>2nd lesson</p>
                            </Panel>
                            <Panel header="Routing" key="3">
                                <p>3rd lesson</p>
                            </Panel>
                        </Collapse>
                    </div>
                    <div style={{marginTop: '1rem'}}>
                        <h2 style={{textAlign: 'center', paddingTop: '1rem'}}>Teachers</h2>
                        <Card
                            hoverable
                            style={{ width: 240, margin: '0 auto' }}
                            cover={<img alt="example" src="https://cdn.shopify.com/s/files/1/2994/3616/products/tokyoghoul_600x.jpg?v=1589523836" />}
                        >
                            <Meta title="Geddoku" description="Nikita Vozniuk" />
                        </Card>
                    </div>
                    <div style={{marginTop: '2rem'}}>
                        <h2 style={{textAlign: 'center'}}>Student's Reviews</h2>
                        <List
                            className="comment-list"
                            header={`${data.length} reviews`}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <li>
                                    <Comment
                                    actions={item.actions}
                                    author={item.author}
                                    avatar={item.avatar}
                                    content={item.content}
                                    datetime={item.datetime}
                                    />
                                </li>
                            )}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}
