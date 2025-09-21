import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OutlinedCard from '../Material/Card';
import { useradmin, petadmin, infoadmin, calendaradmin } from '../../assets/Icon/Icon';
import SupervisorCard from '../Material/SupervisorCard';
export default function Petinfo({ datacard }) {


    return (
        <>
            <Container fluid >
                <Row className="mt-3">


                    {datacard.map((element, index) => (
                        <Col lg={4} md={4} xs={12} sm={12} key={index}>
                            <OutlinedCard
                                icon={element.icon}
                                title={element.title}
                                ditile={element.ditile}
                                color={element.color}
                                colorback={element.colorback}
                            />
                        </Col>
                    ))}


                </Row>
            </Container>
        </>
    );
}
