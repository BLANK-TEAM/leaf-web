import React, { Component } from 'react'
import {
    Button,
    Modal,
    Collapse,
    Card,
    Input,
    Row,
    Col,
    Form,
    Upload 
} from 'antd'
import {
    TranslationOutlined,
    HeartOutlined
} from '@ant-design/icons'
import moment from 'moment';

import CourseItem from './CourseItem'
import AddCoursePage from './AddCoursePage'

const { Panel } = Collapse;
const { Meta } = Card;

export default class CoursePage extends Component {

    state = {
        visible: false,
        loading: false,
        title: ""
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    handleOk = (e) => {
        e.preventDefault()
        console.log(this.state.title)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };


    render() {
        return (
            <div style={{margin: '2rem'}}>
                <Card
                    hoverable
                    style={{ width: '100%', margin: '0 auto' }}
                >
                    <Meta title="Create New Course" description="Add you own education programm" />
                    <Button 
                        style={{float: 'right'}}
                        onClick={() => this.setState({ visible: true })}
                    >
                        Create Own Course
                    </Button>
                </Card>
                <Modal
                    title="Create Your New Course"
                    centered
                    visible={this.state.visible}
                    onOk={() => this.setState({ visible: false })}
                    onCancel={() => this.setState({ visible: false })}
                    width={'80%'}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>
                    ]}
                >
                    <AddCoursePage 
                        user={this.props.user} 
                        room={this.props.room}
                    />
                </Modal>
                <CourseItem />
            </div>
        )
    }
}
