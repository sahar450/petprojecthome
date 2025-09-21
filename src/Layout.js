import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header';
import './assets/css/global.css';
export default function Layout({ children }) {
    return (
        <>
            <Container fluid className=" mianbox">
                <Row className=" mianbox ">
                    <Col md={1} lg={1} >
                        <Sidebar />
                    </Col>
                    <Col lg={11} md={11} xs={12}  >
                        <Row >
                            <Col md={12} lg={12} xs={12}>
                                <Header></Header>

                            </Col>
                            <Col md={12} lg={12} xs={12}>
                                <main>{children}</main>

                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
