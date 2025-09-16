import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Infocard from '../components/infocard.js/Infocard';
import styles from '../assets/css/admin.module.css';
import BascCardi from '../components/Material/Customcard';
import StickyHeadTable from '../components/Material/Table';
import { useradmin, petadmin, infoadmin, calendaradmin ,trasdVisit,Message,Readingmessage,trashmessage} from '../assets/Icon/Icon';
import VisitcardCardi from "../components/Material/VisitCard";
import { visitIcon, timervisitIcon } from "../assets/Icon/Icon";
import NotificationCard from "../components/Material/NotificationCard";

export default function Veterinarian() {
    const datacard = [
        { icon: useradmin, title: "دستیاران", ditile: "124 دستیار", color: "#009CD8", colorback: "#dceff6" },
        { icon: petadmin, title: "در انتظار ویزیت", ditile: "7 پت", color: "#E1910C", colorback: "#f7eddd" },
        { icon: infoadmin, title: "نسخه های صادر شده", ditile: "124 نسخه", color: "#009688", colorback: "#dceeec" },
        { icon: calendaradmin, title: "نوبت های خالی", ditile: "124 نوبت", color: "#4CAF50", colorback: "#e5f1e6" },
    ];
    const dataTableSe = [
        { id: "1", code: "9200254", namepet: "پاپی", supervisor: "1402" },
        { id: "2", code: "9200254", namepet: "پاپی", supervisor: "1402" },
        { id: "3", code: "9200254", namepet: "پاپی", supervisor: "1402" },
        { id: "4", code: "9200254", namepet: "پاپی", supervisor: "1402" },
    ];

    const headSE = [" کد نسخه", " نام پت ", "سرپرست"];

    const dataVisit = [
        { id: "1", time: " 15:30 تا 16:00", icon: visitIcon, details: " رزرو شده برای پاپی ", item: false },
        { id: "2", time: " 15:30 تا 16:00", icon: visitIcon, details: "  رزرو شده برای پاپی ", item: false },
        { id: "3", time: " 15:30 تا 16:00", icon: visitIcon, details: " رزرو شده برای پاپی ", item: false },
        { id: "4", time: " 15:30 تا 16:00", icon: timervisitIcon, details: " در انتظار رزرو ", item: true },
        { id: "5", time: " 15:30 تا 16:00", icon: timervisitIcon, details: " در انتظار رزرو ", item: true },
        { id: "6", time: " 15:30 تا 16:00", icon: visitIcon, details: " رزرو شده برای پاپی ", item: false },
    ]

    const NotificationData = [
        { id: "1", text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32",date: "1404/04/04" },
        { id: "2", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },
        { id: "3", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },
        { id: "4", text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.", time: "16:32", date: "1404/04/04" },

    ]
    return (
        <>
            <Container fluid className="p-0">
                <Row className="g-0 p-0">
                    <Col lg={12} md={12} xs={12} sm={12} >
                        <Infocard datacard={datacard}></Infocard>
                    </Col>
                    <Col lg={5} md={12} xs={12} sm={12} >
                        <div className={styles["boxRight"]}>
                            <div className={styles["boxRight-title"]}>

                                <span className={styles["boxRight-title-d"]}>
                                    آخرین نسخه ها
                                </span>
                                <span className={styles["boxRight-title-di"]}>
                                    مشاهده همه
                                </span>

                            </div>
                            <StickyHeadTable head={headSE} data={dataTableSe} action={true} param={true}></StickyHeadTable>

                        </div>
                    </Col>
                    <Col lg={7} md={12} xs={12} sm={12} >
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

                                    <VisitcardCardi data={dataVisit}></VisitcardCardi>
                                </div>
                            </Col>

                            <Col lg={12} md={12} xs={12} sm={12} >
                                <div className={styles["boxLeft"]}>
                                    <div className={styles["boxRight-title"]}>

                                        <span className={styles["boxRight-title-d"]}>
                                            اعلان ها
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
