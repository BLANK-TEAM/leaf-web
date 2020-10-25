import React, { Component, useEffect } from 'react'
import { Row, Col, List, Icon, Input, Form, Button, Comment, Menu  } from 'antd'
import { connect } from 'react-redux'
import { getRoomContent } from '../../../_actions/rooms_actions'
import {
    BrowserRouter as
    Link
} from "react-router-dom";
import io from 'socket.io-client'

import Main from './Sections/Main/Main'

function Section(props) {

    return (
      <div>
        {props.name === 'main'
            ? (<Main state={props.state} />)
            : null
        }
        {props.name === 'courses'
            ? <div>Courses Section</div>
            : null
        }
        {props.name === 'streams'
            ? <div>Streams Section</div>
            : null
        }
        {props.name === 'extensions'
            ? <div>Extensions Section</div>
            : null
        }
      </div>
    );
}

class RoomPage extends Component {
    
    state = {
        roomId: "",
        roomName: "",
        subject: "",
        users: undefined,
        current: 'main'
    }

    componentDidMount() {

        let length = window.location.pathname.length
        let key = window.location.pathname.substring(6, length)

        this.props.dispatch(getRoomContent(key))
            .then((res) => {
                this.setState({
                    roomId: res.payload._id,
                    roomName: res.payload.name,
                    users: res.payload.users,
                    subject: res.payload.subject
                })
            })
            .then(() => {
                var qsParams = `?name=${this.state.current}`;
                var data = `{ name: ${this.state.current} }`;
                var title = `${this.state.current}`;
                window.history.pushState(data, title, qsParams);
            })
    }

    onMessageChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleClick = e => {
        this.setState({ current: e.key })
        setTimeout(() => {
            var qsParams = `?name=${this.state.current}`;
            var data = `{ name: ${this.state.current} }`;
            var title = `${this.state.current}`;
            window.history.pushState(data, title, qsParams);
        }, 100)
    };

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Row>
                <Col span={20} push={4}>
                    <Section 
                        name={this.state.current} 
                        state={this.state} 
                    />
                </Col>
                <Col span={4} pull={20}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                >
                    <Menu.Item key="main">
                        <Link to="?name=main">Main</Link>
                    </Menu.Item>
                    <Menu.Item key="courses">
                        <Link to="?name=courses">Courses</Link>
                    </Menu.Item>
                    <Menu.Item key="streams">
                        <Link to="?name=streams">Streams</Link>
                    </Menu.Item>
                    <Menu.Item key="extensions">
                        <Link to="?name=extensions">Extensions</Link>
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        room: state.room
    }
}

export default connect(mapStateToProps)(RoomPage)