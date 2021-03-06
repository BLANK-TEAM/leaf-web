import React, { Component } from 'react'
import { 
    Modal, 
    Form,
    Input, 
    Button, 
    Row, 
    Col,
    List,
    Divider 
} from 'antd'
import { connect } from 'react-redux'
import { createNewRoom, getUserRooms, joinRoom } from '../../../_actions/rooms_actions'
import { NavLink } from 'react-router-dom'

const RoomItem = props => {
    return (
        <List.Item>
            <NavLink to={`/room/${props.item.roomKey}`} >{props.item.name}</NavLink>
        </List.Item>
    )
}

class LandingPage extends Component {

    state = {
        joinVisible: false,
        createVisible: false,
        roomId: "",
        username: "",
        subject: "",
        roomName: "",
        roomKey: "",
        rooms: undefined
    }

    componentDidMount() {
        this.setState({
            username: localStorage.getItem('userId')
        });

        setTimeout(() => {
            this.props.dispatch(getUserRooms(this.state.username)).then((res) => {
                console.log(res.payload)
                this.setState({
                    rooms: res.payload
                })
            })
        }, 50)
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

    onRoomKeyChange = (e) => {
        this.setState({
            roomKey: e.target.value
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

        let data = {
            room: this.state.roomId,
            user: this.props.user.userData._id
        }

        this.props.dispatch(joinRoom(data)).then((res) => {
        //    alert(`You successfully added to ${res.payload[0].name}`)
        //    window.location = `/room/${data.room}` 
        console.log(res.payload)
        })
    }

    submitCreate = (e) => {
        e.preventDefault()

        let room = {
            name: this.state.roomName,
            subject: this.state.subject,
            users: [this.state.username],
            messages: [],
            courses: [],
            roomKey: this.state.roomKey,
            author: this.props.user.userData._id
        }

        this.props.dispatch(createNewRoom(room)).then((res) => {
            console.log(res);
            window.location = `/room/${room.roomKey}`
        })
    }

    render() {
        return (
            <div style={{ marginTop: '2rem'}}>
                <Row style={{textAlign: 'center'}}>
                    <Col xs={{ span: 8}} lg={{ span: 8 }}>
                        <Divider orientation="left">Joined Rooms/Courses</Divider>
                        <List
                            bordered
                            dataSource={this.state.rooms}
                            renderItem={item => (<RoomItem item={item} />)}
                        />
                    </Col>
                    <Col xs={{ span: 8}} lg={{ span: 8 }}>
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

                                <Form.Item>
                                    <Button block type="primary" htmlType="submit">
                                        JOIN
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Col>
                    <Col xs={{ span: 8}} lg={{ span: 8 }}>
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

                                <Form.Item
                                    label="Room Key"
                                    name="key"
                                >
                                    <Input onChange={this.onRoomKeyChange} />
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
