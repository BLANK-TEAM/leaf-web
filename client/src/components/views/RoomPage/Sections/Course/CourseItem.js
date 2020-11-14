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
import {
    BrowserRouter as
    NavLink
} from "react-router-dom";

const { Panel } = Collapse;
const { Meta } = Card;

class CourseItem extends React.Component {

    state = {
        visible: false,
        loading: false
    }

    handleCancel = () => {

    }

    handleOk = () => {

    }

    edit = () => {
        window.location = `/edit/${this.props.course._id}`
    }

    render() {
        return (
            <div>
                <Tooltip title={this.props.course.learnItems}>
                        <Row onClick={() => this.setState({ visible: true })} style={{display: 'flex', maxWidth: '100rem', cursor: 'pointer', marginTop: '2rem'}}>
                            <Col span={24}>
                                <div style={{display: 'flex'}}>
                                    <img
                                        style={{
                                            borderStyle: 'solid', 
                                            borderWidth: '1px',
                                            borderRadius: '0.3rem',
                                            width: '240px',
                                            minWidth: '240px',
                                            height: '140px'
                                        }}
                                        src={`http://localhost:5000/${this.props.course.images[0]}`}
                                    />
                                    <div 
                                        style={{
                                            marginLeft: '0.5rem',
                                            maxWidth: '60%'
                                        }}
                                    >
                                        <h3 style={{fontWeight: 'bold'}}>{this.props.course.title}</h3>
                                        <h4>{this.props.course.subTitle}</h4>
                                        {this.props.user._id === this.props.course.author._id
                                        ? <h4 style={{color: '#b5b551'}}>{this.props.course.author.name}(you)</h4>
                                        : <h4 style={{color: '#adadad'}}>{this.props.course.author.name}</h4>
                                        }
                                        <h4 style={{color: '#8e8e8e'}}>
                                            Total lessons: {this.props.course.lessons.length}
                                        </h4>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Divider />
                    </Tooltip>
                    <Modal
                        title={this.props.course.title}
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
                                    marginTop: '0.5rem',
                                    width: '240px'
                                }}
                                src={`http://localhost:5000/${this.props.course.images[0]}`}
                            />
                            <div style={{marginTop: '1rem'}}>
                                <h2>{this.props.course.title}</h2>
                                <h3>{this.props.course.subTitle}</h3>
                                <h4>Authors: {this.props.course.author.name}</h4>
                                <h4><TranslationOutlined /> {this.props.course.languages}</h4>
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
                                <h4>· {this.props.course.lessons.length} lection</h4>
                            </div>
                            {/* <Collapse style={{backgroundColor: '#f5f5f5'}} defaultActiveKey={['1']}>
                                <Panel header={course.materials.title} key="1">
                                    <p>{course.materials.item}</p>
                                </Panel>
                            </Collapse> */}
                        </div>
                        <div style={{marginTop: '1rem'}}>
                            <h2 style={{textAlign: 'center', paddingTop: '1rem'}}>Teachers</h2>
                            <Card
                                hoverable
                                style={{ width: 240, margin: '0 auto' }}
                                cover={<img alt="example" src={this.props.course.teachers[0].image} />}
                            >
                                <Meta 
                                    title={this.props.course.teachers[0].name} 
                                    description={this.props.course.teachers[0].name} 
                                />
                            </Card>
                        </div>
                        <div style={{marginTop: '2rem'}}>
                            <h2 style={{textAlign: 'center'}}>Student's Reviews</h2>
                            <List
                                className="comment-list"
                                header={`${this.props.course.reviews.length} reviews`}
                                itemLayout="horizontal"
                                dataSource={this.props.course.reviews}
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
                        {this.props.user._id === this.props.course.author._id
                        ?   <>
                        
                            <div 
                                style={{
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Button 
                                    style={{
                                        color: '#eb4034',
                                        borderColor: "red"
                                    }}
                                >
                                    Delete Course
                                </Button>
                                <Button 
                                    style={{
                                        color: '#21de63',
                                        borderColor: "#21de63",
                                        marginLeft: '1rem'
                                    }}
                                    onClick={this.edit}
                                >
                                   Update Course
                                </Button>
                            </div>
                            
                            </>
                        : null
                        }
                    </Modal>
            </div>
        )
    }
    
}

export default CourseItem
