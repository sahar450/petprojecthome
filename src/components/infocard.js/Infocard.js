import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OutlinedCard from '../Material/Card';
import { useradmin, petadmin, infoadmin, calendaradmin } from '../../assets/Icon/Icon';
import SupervisorCard from '../Material/SupervisorCard';
export default function Infocard({ datacard, flag = false }) {


    return (
        <>
            <Container fluid >
                <Row className="mt-3">
                    {flag ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            {datacard.map((element, index) => (
                                <Col lg={3} md={3} xs={6} sm={6} key={index}>
                                    <OutlinedCard
                                        icon={element.icon}
                                        title={element.title}
                                        ditile={element.ditile}
                                        color={element.color}
                                        colorback={element.colorback}
                                    />
                                </Col>
                            ))}
                        </>
                    )}

                </Row>
            </Container>
        </>
    );
}
