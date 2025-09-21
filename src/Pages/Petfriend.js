import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Infocard from '../components/infocard.js/Infocard';
import styles from '../assets/css/admin.module.css';
import BascCardi from '../components/Material/Customcard';
import StickyHeadTable from '../components/Material/Table';
import { useradmin, petadmin, infoadmin, calendaradmin } from '../assets/Icon/Icon';
import NotificationCard from "../components/Material/NotificationCard";
import SupervisorCard from '../components/Material/SupervisorCard';
import pet from '../assets/image/A-puppy.png';

export default function Petfriend() {
    const datacard = [
        { icon: petadmin, title: "پت های ثبت شده", ditile: "124  پت", color: "#E1910C", colorback: "#f7eddd" },
        { icon: infoadmin, title: "شناسنامه ها صادر شده", ditile: "124 نسخه", color: "#009688", colorback: "#dceeec" },
        { icon: calendaradmin, title: "مجموع سود شما", ditile: "124 نوبت", color: "#4CAF50", colorback: "#e5f1e6" },
    ];
    const head = ["عنوان تراکنش", "کاربر", "تاریخ", "وضعیت"];

    const dataTable = [
        { id: "1", ssn: "صدور شناسنامه", name: "علیرضا بهرامی", date: "1402", Conditions: 0 },
        { id: "2", ssn: "صدور شناسنامه", name: "علی رضایی", date: "1402", Conditions: 1 },
        { id: "3", ssn: "صدور شناسنامه", name: "سارا کاظمی", date: "1402", Conditions: 2 },
        { id: "4", ssn: "صدور شناسنامه", name: "نازنین موسوی", date: "1402", Conditions: 3 },
    ];
    const NotificationData = [
        { id: "1", text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },
        { id: "2", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },
        { id: "3", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },
        { id: "4", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },


    ]
    const data = [
        { id: "1", name: "پاپی1 ", Category: "اسم دسته" },
        { id: "2", name: " پاپی2 ", Category: "اسم دسته" },
        { id: "3", name: " پاپی2 ", Category: "اسم دسته" },

    ];

    return (
        <>
            <Container fluid className="p-0">
                <Row className="g-0 p-0">
                    <Col lg={12} md={12} xs={12} sm={12} >
                        <Infocard datacard={datacard} flag={true}></Infocard>                    </Col>
                    <Col lg={12} md={12} xs={12} sm={12} >
                        <div className={styles["boxRight"]}>
                            <div className={styles["boxRight-title"]}>

                                <span className={styles["boxRight-title-d"]}>
                                    رتبه شما
                                </span>
                                <span className={styles["boxRight-title-di"]}>
                                    مشاهده همه
                                </span>

                            </div>
                            <Row>
                                {data.map((item) => (
                                    <Col lg={4} md={6} sm={12} key={item.id}>
                                        <SupervisorCard data={[item]} img={pet} flag={true} />
                                    </Col>
                                ))}
                            </Row>



                        </div>
                    </Col>
                    <Col lg={12} md={12} xs={12} sm={12} >
                        <Row>
                            <Col lg={6} md={12} xs={12} sm={12} >
                                <div className={styles["boxLeft"]}>
                                    <div className={styles["boxRight-title"]}>

                                        <span className={styles["boxRight-title-d"]}>
                                            آخرین تراکنش ها
                                        </span>
                                        <span className={styles["boxRight-title-di"]}>
                                            مشاهده همه
                                        </span>

                                    </div>

                                    <StickyHeadTable head={head} data={dataTable}></StickyHeadTable>

                                </div>
                            </Col>

                            <Col lg={6} md={12} xs={12} sm={12} >
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
