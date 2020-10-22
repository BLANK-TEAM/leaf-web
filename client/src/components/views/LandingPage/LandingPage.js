import React, { Component } from 'react'
import { 
    Modal, 
    Form,
    Input, 
    Button, 
    Row, 
    Col 
} from 'antd'
import { connect } from 'react-redux'
import { createNewRoom} from '../../../_actions/rooms_actions'

class LandingPage extends Component {

    state = {
        joinVisible: false,
        createVisible: false,
        roomId: "",
        username: "",
        subject: "",
        roomName: ""
    }

    componentDidMount() {
        this.setState({
            username: localStorage.getItem('userId')
        });
    }

    onRoomChange = (e) => {
        this.setState({
            roomId: e.target.value
        })
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onRoomNameChange = (e) => {
        this.setState({
            roomName: e.target.value
        })
    }

    onSubjectChange = (e) => {
        this.setState({
            subject: e.target.value
        })
    }

    showJoin = () => {
        this.setState({
            joinVisible: true
        })
    }

    showCreate = () => {
        this.setState({
            createVisible: true
        })
    }

    handleJoinOk = (e) => {
        console.log(e)
        this.setState({
            joinVisible: false
        })
    }

    handleJoinCancel = () => {
        this.setState({
            joinVisible: false
        })
    }

    handleCreateOk = (e) => {
        console.log(e)
        this.setState({
            createVisible: false
        })
    }

    handleCreateCancel = () => {
        this.setState({
            createVisible: false
        })
    }

    submitJoin = (e) => {
        e.preventDefault()

        console.log({
            id: this.state.roomId,
            username: this.state.username
        })
    }

    submitCreate = (e) => {
        e.preventDefault()

        let room = {
            name: this.state.roomName,
            subject: this.state.subject,
            users: [this.state.username],
            messages: [],
            courses: []
        }

        this.props.dispatch(createNewRoom(room)).then((res) => console.log(res))
    }

    render() {
        return (
            <div style={{ marginTop: '2rem'}}>
                <Row style={{textAlign: 'center'}}>
                    <Col style={{backgroundColor: '#f55'}} xs={{ span: 8}} lg={{ span: 8 }}>
                        Joined Rooms/Courses
                    </Col>
                    <Col style={{backgroundColor: '#445'}} xs={{ span: 8}} lg={{ span: 8 }}>
                        <Button type="default" onClick={this.showJoin}>
                            Join Room
                        </Button>
                        <Modal
                            title="Join Room"
                            visible={this.state.joinVisible}
                            onOk={this.handleJoinOk}
                            onCancel={this.handleJoinCancel}
                            footer={[
                                <Button key="back" onClick={this.handleJoinCancel}>
                                  Cancel
                                </Button>
                              ]}
                        >
                            <Form
                                layout="vertical"
                                name="basic"
                                onSubmit={this.submitJoin}
                            >
                                <Form.Item
                                    label="Room ID"
                                    name="room"
                                >
                                    <Input onChange={this.onRoomChange} />
                                </Form.Item>

                                <Form.Item
                                    label="Username"
                                    name="username"
                                >
                                    <Input onChange={this.onUsernameChange} />
                                </Form.Item>


                                <Form.Item>
                                    <Button block type="primary" htmlType="submit">
                                        JOIN
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Col>
                    <Col style={{backgroundColor: '#555'}} xs={{ span: 8}} lg={{ span: 8 }}>
                        <Button type="primary" onClick={this.showCreate}>
                            Create Room
                        </Button>
                        <Modal
                            title="Create New Room"
                            visible={this.state.createVisible}
                            onOk={this.handleCreateOk}
                            onCancel={this.handleCreateCancel}
                            footer={[
                                <Button key="back" onClick={this.handleCreateCancel}>
                                  Cancel
                                </Button>
                              ]}
                        >
                            <Form
                                layout="vertical"
                                name="basic"
                                onSubmit={this.submitCreate}
                            >
                                <Form.Item
                                    label="Name"
                                    name="roomName"
                                >
                                    <Input onChange={this.onRoomNameChange} />
                                </Form.Item>

                                <Form.Item
                                    label="Subject"
                                    name="subject"
                                >
                                    <Input onChange={this.onSubjectChange} />
                                </Form.Item>


                                <Form.Item>
                                    <Button block type="primary" htmlType="submit">
                                        Create
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
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

export default connect(mapStateToProps)(LandingPage)
