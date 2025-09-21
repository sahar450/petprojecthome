import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Infocard from '../components/infocard.js/Infocard';
import styles from '../assets/css/admin.module.css';
import BascCardi from '../components/Material/Customcard';
import StickyHeadTable from '../components/Material/Table';
import { useradmin, petadmin, infoadmin, calendaradmin } from '../assets/Icon/Icon';
export default function Admin() {
    const data = [
        { id: "1", name: "علی رضایی", role: "فعال" },
        { id: "2", name: "مریم احمدی", role: "فعال" },
        { id: "3", name: "سارا کاظمی", role: "فعال" },
        { id: "4", name: "رضا شفیع", role: "فعال" },
        { id: "5", name: " نازنین موسوی ", role: "فعال" },
        { id: "6", name: "امیر رستمی", role: "فعال" },
    ];
    const head = ["عنوان تراکنش", "کاربر", "تاریخ", "وضعیت"];

    const dataTable = [
        { id: "1", ssn: "صدور شناسنامه", name: "علیرضا بهرامی", date: "1402", Conditions: 0 },
        { id: "2", ssn: "صدور شناسنامه", name: "علی رضایی", date: "1402", Conditions: 1 },
        { id: "3", ssn: "صدور شناسنامه", name: "سارا کاظمی", date: "1402", Conditions: 2 },
        { id: "4", ssn: "صدور شناسنامه", name: "نازنین موسوی", date: "1402", Conditions: 3 },
    ];

    const dataTableSe = [
        { id: "1", name: "پاپی1", nameDr: " سارا کاظمی", date: "1402", time: "14:00", Conditions: 0 },

        { id: "2", name: "پاپی2", nameDr: "  سارا کاظمی2", date: "1402", time: "14:00", Conditions: 1 },

        { id: "3", name: "پاپی3", nameDr: "  سارا کاظمی3", date: "1402", time: "14:00", Conditions: 2 },

        { id: "4", name: "پاپی4", nameDr: "  سارا کاظمی4", date: "1402", time: "14:00", Conditions:3 },

        { id: "5", name: "پاپی5", nameDr: " دامپزشک ", date: "1402", time: "14:00", Conditions: 0 },
    ];

    const headSE = [" نام پت ", " دامپزشک", "تاریخ", "ساعت ", "وضعیت", " عملیات "];
    const datacard = [
        { icon: useradmin, title: "کاربران من", ditile: "124 کاربر", color: "#009CD8", colorback: "#dceff6" },
        { icon: petadmin, title: "پت های ثبت شده", ditile: "124  پت", color: "#E1910C", colorback: "#f7eddd" },
        { icon: infoadmin, title: "نسخه های صادر شده", ditile: "124 نسخه", color: "#009688", colorback: "#dceeec" },
        { icon: calendaradmin, title: "نوبت های رزرو شده", ditile: "124 نوبت", color: "#4CAF50", colorback: "#e5f1e6" },
    ];
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
                                    جدیدترین دامپزشکان
                                </span>
                                <span className={styles["boxRight-title-di"]}>
                                    مشاهده همه
                                </span>

                            </div>
                            <BascCardi data={data} />
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

                                    <StickyHeadTable head={head} data={dataTable}></StickyHeadTable>

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

                                    <StickyHeadTable head={headSE} data={dataTableSe} action={true}></StickyHeadTable>

                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
