import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Infocard from '../components/infocard.js/Infocard';
import styles from '../assets/css/admin.module.css';
import SupervisorCard from '../components/Material/SupervisorCard';
import SupervisorTable from '../components/Material/SupervisorTable';
import { useradmin, petadmin, infoadmin, calendaradmin } from '../assets/Icon/Icon';
import pet from '../assets/image/A-puppy.png';
import { visitIcon, timervisitIcon } from "../assets/Icon/Icon";

import NotificationCard from "../components/Material/NotificationCard";
export default function Supervisor() {
  const datacard = [
    { icon: petadmin, title: "پت های ثبت شده", ditile: "124  پت", color: "#E1910C", colorback: "#f7eddd" },
    { icon: infoadmin, title: "نام واکسن", ditile: "124 نسخه", color: "#009688", colorback: "#dceeec" },
    { icon: calendaradmin, title: "نام دامپزشک", ditile: "124 نوبت", color: "#4CAF50", colorback: "#e5f1e6" },
  ];
  const data = [
    { id: "1", name: "پاپی1 ", Category: "اسم دسته" },
    { id: "2", name: " پاپی2 ", Category: "اسم دسته" },
    { id: "3", name: " پاپی3 ", Category: "اسم دسته" },
    { id: "4", name: " پاپی4 ", Category: "اسم دسته" },
    { id: "5", name: " پاپی5 ", Category: "اسم دسته" },
  ];
  const NotificationData = [
    { id: "1", text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },
    { id: "2", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },
    { id: "3", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },
    { id: "4", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },

  ]

const dataVisit = [
  {
    id: "1",
    date: "1404/04/04",
    time: "15:30 تا 16:00",
    pet: "پاپی",
    doctor: "طاها محمدی",
   
  },
  {
    id: "2",
    date: "1404/04/05",
    time: "16:30 تا 17:00",
    pet: "میلو",
    doctor: "سارا رضایی",
  },
  {
    id: "3",
    date: "1404/04/05",
    time: "16:30 تا 17:00",
    pet: "میلو",
    doctor: "امین رضایی ",
  },
  {
    id: "4",
    date: "1404/04/05",
    time: "16:30 تا 17:00",
    pet: "پاپی",
    doctor: "امین رضایی ",
  },
  
];

  return (
    <> <Container fluid className="p-0">
      <Row className="g-0 p-0">
        <Col lg={12} md={12} xs={12} sm={12} >
          <Infocard datacard={datacard} flag={true}></Infocard>
        </Col>
        <Col lg={4} md={12} xs={12} sm={12} >
          <div className={styles["boxRight"]}>
            <div className={styles["boxRight-title"]}>

              <span className={styles["boxRight-title-d"]}>
                جدیدترین پت ها
              </span>
              <span className={styles["boxRight-title-di"]}>
                مشاهده همه
              </span>

            </div>
            <SupervisorCard data={data} img={pet} />

          </div>
        </Col>
        <Col lg={8} md={12} xs={12} sm={12} >
          <Row>
            <Col lg={12} md={12} xs={12} sm={12} >
              <div className={styles["boxLeft"]}>
                <div className={styles["boxRight-title"]}>

                  <span className={styles["boxRight-title-d"]}>
                    آخرین تراکنش ها
                  </span>
                  <span className={styles["boxRight-title-di"]}>
                    مشاهده همه
                  </span>

                </div>

                <SupervisorTable  data={dataVisit} action={true}></SupervisorTable>

              </div>
            </Col>

            <Col lg={12} md={12} xs={12} sm={12} >
              <div className={styles["boxLeft"]}>
                <div className={styles["boxRight-title"]}>

                  <span className={styles["boxRight-title-d"]}>
                    ملاقات ها
                  </span>
                  <span className={styles["boxRight-title-di"]}>
                    مشاهده همه
                  </span>

                </div>

                <NotificationCard data={NotificationData}></NotificationCard>

              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    </>
  )
}
