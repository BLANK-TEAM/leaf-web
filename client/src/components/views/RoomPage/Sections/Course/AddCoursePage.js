import React, { Component } from 'react'
import { 
    Form, 
    Icon, 
    Input, 
    Button,
    Select,
    Upload 
} from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import FileUpload from '../../../../utils/FileUpload'
import Axios from 'axios';

export default class AddCoursePage extends Component {

    state = {
        title: '',
        subTitle: '',
        learnItems: '',
        languages: '',
        Images: []
    }

    updateImages = newImage => {
        this.setState({
            Images: newImage
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const course = {
            title: this.state.title,
            subTitle: this.state.subTitle,
            learnItems: this.state.learnItems,
            images: this.state.Images,
            languages: this.state.languages,
            teachers: this.props.user._id,
            room: this.props.room._id,
            author: this.props.user._id,
            lessons: [],
            reviews: []
        }

        console.log(course)

        Axios.post('/api/courses/add', course)
            .then(res => {
                if (res.data.success) {
                    alert('Course successfully created!')
                    window.location = `/room/${this.props.room.roomKey}`
                } else {
                    alert('Failed to create Course!')
                }
            })

    }

    render() {
        return (
            <div>
                <Form
                    onSubmit={this.onSubmit}
                >
                    <Form.Item name="Title" label="Title">
                        <Input 
                            value={this.state.title} 
                            onChange={(e) => this.setState({ 
                                title: e.target.value 
                            })} 
                        />
                    </Form.Item>
                    <Form.Item name="SubTitle" label="SubTitle">
                        <Input 
                            value={this.state.subTitle} 
                            onChange={(e) => this.setState({ 
                                subTitle: e.target.value 
                            })} 
                        />
                    </Form.Item>
                    <Form.Item label="What do you want to teach?">
                        <Select
                            onChange={(e) => this.setState({ 
                                learnItems: e 
                            })}
                            value={this.state.learnItems}
                        >
                            <Select.Option value="Programming">Programming</Select.Option>
                            <Select.Option value="English">English</Select.Option>
                            <Select.Option value="Math">Math</Select.Option>
                            <Select.Option value="History">History</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Upload"
                        label="Upload Cover Picture"
                    >
                        <FileUpload refreshFunction={this.updateImages} />
                    </Form.Item>
                    <Form.Item label="Teaching language">
                        <Select
                            onChange={(e) => this.setState({ 
                                languages: e 
                            })}
                            value={this.state.languages}
                        >
                            <Select.Option value="English">English</Select.Option>
                            <Select.Option value="Русский">Русский</Select.Option>
                            <Select.Option value="Español">Español</Select.Option>
                            <Select.Option value="عَرَبِيّ‎">عَرَبِيّ‎</Select.Option>
                            <Select.Option value="漢語">漢語</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block
                            onClick={this.onSubmit}
                        >
                            Create New Course
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}