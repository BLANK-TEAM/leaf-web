import React, { Component, useEffect } from 'react'
import { Row, Col, List, Icon, Input, Form, Button, Comment, Menu  } from 'antd'
import { connect } from 'react-redux'
import { getRoomContent } from '../../../_actions/rooms_actions'
import io from 'socket.io-client'
import {
    BrowserRouter as
    Link
} from "react-router-dom";

function Section({ name }) {

    return (
      <div>
        {name ? (
          <h3>
            The <code>name</code> in the query string is &quot;{name}
            &quot;
          </h3>
        ) : (
          <h3>There is no name in the query string</h3>
        )}
      </div>
    );
}

class RoomPage extends Component {
    
    state = {
        message: "",
        roomName: "",
        subject: "",
        users: undefined,
        current: 'main',
    }

    componentDidMount() {
        let length = window.location.pathname.length
        let key = window.location.pathname.substring(6, length)

        console.log(window.location.search)

        this.props.dispatch(getRoomContent(key))
            .then((res) => {
                this.setState({
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
        }, 500)
    };

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <>
            <h4 style={{padding: '1rem'}}>{this.state.roomName}</h4>
            <Row>
                <Col span={20} push={4}>
                    <Section name={this.state.current} />
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
        </>
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