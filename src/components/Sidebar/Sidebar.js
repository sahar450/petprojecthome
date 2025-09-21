import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../assets/css/Sidebar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Notification, menu, cost, chart, calendar, info, pet, user, home } from '../../assets/Icon/Icon';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const inforesmenu = [
    { icon: home, label: 'خانه', to: '/Veterinarian' },
    { icon: user, label: ' کاربران ', to: '/Editversion' },
    { icon: pet, label: 'پت ها', to: '/Supervisor' },
    { icon: info, label: ' نسخه ها', to: '/Petfriend' },
    { icon: calendar, label: ' ملاقات ها', to: '/MeetingsPage' },
    { icon: chart, label: ' گزارشات مالی', to: '/MeetingsPage' },
    { icon: cost, label: ' تعرفه', to: '/' },

  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="auto" className={styles.sidebarCol}>
            <div className={styles.Sidebarbox}>
              {inforesmenu.map(({ icon, label, to }, index) => (
                <div
                  key={index}
                  className={styles["Sidebarbox-icon-box"]}
                  onClick={() => setActiveIndex(index)}
                >
                  <Link className={styles["sidebarIcon-link"]} to={to}>
                    <div className={`${styles.sidebarIcon} ${activeIndex === index ? styles.active : ''}`}>
                      {icon}
                    </div>
                    <span className={styles.sidebarText}>{label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
