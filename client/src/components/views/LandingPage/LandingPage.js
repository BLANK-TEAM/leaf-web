import React from 'react'
import { Form, Input, Button, Row, Col } from 'antd'

function LandingPage() {
    return (
        <div style={{ marginTop: '2rem'}}>
            <Row style={{textAlign: 'center'}}>
                <Col style={{backgroundColor: '#f55'}} xs={{ span: 8}} lg={{ span: 8, offset: 1 }}>
                    Joined Rooms/Courses
                </Col>
                <Col style={{backgroundColor: '#445'}} xs={{ span: 8}} lg={{ span: 8, offset: 1 }}>
                    Join Room/Course
                </Col>
                <Col style={{backgroundColor: '#555'}} xs={{ span: 8}} lg={{ span: 8, offset: 1 }}>
                    Create Room/Course
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage
