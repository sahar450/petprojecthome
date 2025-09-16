import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DrawerAppBar from './Material/AppBar';
import Sidebar from './Sidebar/Sidebar';
export default function Header() {
  return (
    <>
    <Container fluid >
        <Row >
            <Col lg={12} md={12} xs={12} >
                    <DrawerAppBar></DrawerAppBar>
            </Col>
        </Row>
    </Container>
    </>
  )
}
