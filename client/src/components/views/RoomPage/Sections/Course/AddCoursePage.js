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

export default class AddCoursePage extends Component {

    state = {
        title: '',
        subTitle: '',
        learnItems: '',
        languages: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    onUploadFile = ({ file, fileList }) => {
        if (file.status !== 'uploading') {
            console.log(file);
        }
    }

    render() {
        return (
            <div>
                <Form
                    onSubmit={this.handleSubmit}
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
                        <Upload 
                            onChange={this.onUploadFile}
                        >
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
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
                        <Button type="primary" htmlType="submit" block>
                            Create New Course
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
