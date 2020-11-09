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
        learnItems: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

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
                        <Upload>
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
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
