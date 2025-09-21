import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/Editversion.module.css";
import pupy from "../assets/image/A-puppy.png";
import {
    edit,
    drag,
    TherapeuticMeasures,
    Recommendations,
} from "../assets/Icon/Icon";
import DynamicModal from "../components/Material/modal";
import CustomInput from "../components/Material/Input";
import CustomSelect from "../components/Material/CustomSelect";
import CustomButton from "../components/Material/Custombutton";
import CustomChip from "../components/Material/Chip";
export default function Editversion() {
    const [info, setinfo] = useState("کاهش وزن شدید و بدخلقی");
    const [open, setopen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const handleUpdate = (formData) => {
        setinfo(formData.title);
    };

    const infotab = [
        { icon: drag, title: " دارو / واکسن" },
        { icon: TherapeuticMeasures, title: "اقدامات درمانی" },
        { icon: Recommendations, title: "توصیه ها" },
    ];

    const dataInputTop = [
        { key: "name", type: "select", label: "نام دارو", options: ["دسته 1", "دسته 2", "دسته 3"] },
        { key: "dose", type: "text", label: "دوز مصرف" },
        { key: "count", type: "text", label: "تعداد" },
        { key: "time", type: "select", label: "مدت مصرف", options: ["1", "2", "3", "4", "5"] },
        { key: "description", type: "textarea", label: "توضیحات" }
    ];

    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
        name: "",
        dose: "",
        count: "",
        time: "",
        description: "",
    });

    const handleChange = (key, value) => {
        setCurrentItem((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAdd = () => {
        setItems((prev) => [...prev, { id: Date.now(), ...currentItem }]);
        setCurrentItem({ name: "", dose: "", count: "", time: "", description: "" });
    };

    const dataInputb = [
        { key: "Drugname", type: "select", label: "نام واکسن", options: ["دسته 1", "دسته 2", "دسته 3"] },
        { key: "Number", type: "text", label: "تعداد" },
        { key: "Injectionperiod", type: "select", label: " دوره تزریق", options: ["دسته 1", "دسته 2", "دسته 3"] },
        { key: "description", type: "textarea", label: "توضیحات" }
    ];

    const [itemDown, setitemDown] = useState([]);
    const [dataformitemDown, setdataformitemDown] = useState({
        Drugname: "", Number: "", Injectionperiod: "", description: ""
    });

    const handleChangeDown = (key, value) => {
        setdataformitemDown((prev) => ({
            ...prev, [key]: value
        }))
    }

    const handleAddDown = () => {
        setitemDown((prev) => [...prev, { id: Date.now(), ...dataformitemDown }]);
        setdataformitemDown({ Drugname: "", Number: "", Injectionperiod: "", description: "" });
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <div className={styles["topBOX"]}>
                        <div className={styles["topBOXright"]}>
                            <div>
                                <img className={styles["topBOXright-img"]} src={pupy} alt="puppy" />
                            </div>
                            <div className={styles["topBOXright-left"]}>
                                <h2>پاپی - Puppy</h2>
                                <div className={styles["topBOXright-info-box"]}>
                                    <span>عنوان مراجعه</span>
                                    <div className={styles["topBOXright-info"]}>
                                        <span>{info}</span>
                                        <button onClick={() => setopen(true)}>{edit}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DynamicModal
                        open={open}
                        onClose={() => setopen(false)}
                        title="ویرایش"
                        fields={[{ type: "text", name: "title", label: "عنوان مراجعه" }]}
                        initialValues={{ title: info }}
                        onSubmit={handleUpdate}
                    />
                </Col>

                <Col lg={12} md={12} xs={12}>
                    <div className={styles.version}>
                        <h5>ویرایش نسخه</h5>
                        <div className={styles["version-tabbar"]}>
                            {infotab.map((element, index) => (
                                <button
                                    key={index}
                                    className={`${styles["version-tab"]} ${activeTab === index ? styles["active"] : ""}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    <span className={styles["version-icon"]}>{element.icon}</span>
                                    <span className={styles["version-titletab"]}>{element.title}</span>
                                </button>
                            ))}
                            <hr />
                        </div>

                        {activeTab === 0 && (
                            <>
                                <div className={styles["tabBar-content"]}>
                                    <Row>
                                        <span className={styles["tabBar-content-title"]}>تجویز دارو</span>
                                        {dataInputTop.map((element) => (
                                            <Col
                                                key={element.key}
                                                lg={element.key === "description" ? 12 : 3}
                                                md={element.key === "description" ? 12 : 6}
                                                sm={12}
                                                xs={12}
                                                className="mt-2 mb-3"
                                            >
                                                {element.type === "text" || element.type === "textarea" ? (
                                                    <CustomInput
                                                        id={element.key}
                                                        label={element.label}
                                                        type={element.type}
                                                        value={currentItem[element.key]}
                                                        onChange={(e) => handleChange(element.key, e.target.value)}
                                                    />
                                                ) : element.type === "select" && element.options ? (
                                                    <CustomSelect
                                                        id={element.key}
                                                        label={element.label}
                                                        options={element.options.map(opt => ({ label: opt, value: opt }))}
                                                        value={currentItem[element.key]}
                                                        onChange={(e) => handleChange(element.key, e.target.value)}
                                                    />
                                                ) : null}
                                            </Col>
                                        ))}
                                    </Row>

                                    <div className={styles.btn}>
                                        <CustomButton bgcolor="transparent" colort="#00796B" className="mt-3" onClick={handleAdd}>افزودن</CustomButton>
                                    </div>
                                </div>

                                <div className="mt-4 add">


                                    {items.map((item) => (
                                        <div key={item.id} style={{ display: "inline-block", margin: "4px" }}>
                                            <CustomChip item1={item.name} item2={item.dose} item3={item.count} item4={item.time} onDelete={() => setItems((prev) => prev.filter((i) => i.id !== item.id))} />

                                        </div>

                                    ))}

                                </div>

                                <div className={styles["tabBar-content"]}>
                                    <Row>
                                        <span className={styles["tabBar-content-title"]}> تجویز واکسن </span>
                                        {dataInputb.map((element) => (
                                            <Col
                                                key={element.key}
                                                lg={element.key === "description" ? 12 : 4}
                                                md={element.key === "description" ? 12 : 6}
                                                sm={12}
                                                xs={12}
                                                className="mt-2 mb-3"
                                            >
                                                {element.type === "text" || element.type === "textarea" ? (
                                                    <CustomInput
                                                        id={element.key}
                                                        label={element.label}
                                                        type={element.type}
                                                        value={dataformitemDown[element.key]}
                                                        onChange={(e) => handleChangeDown(element.key, e.target.value)}
                                                    />
                                                ) : element.type === "select" && element.options ? (
                                                    <CustomSelect
                                                        id={element.key}
                                                        label={element.label}
                                                        options={element.options.map(opt => ({ label: opt, value: opt }))}
                                                        value={dataformitemDown[element.key]}
                                                        onChange={(e) => handleChangeDown(element.key, e.target.value)}
                                                    />
                                                ) : null}
                                            </Col>
                                        ))}
                                        <div className={styles.btn}>
                                            <CustomButton bgcolor="transparent" colort="#00796B" className="mt-3" onClick={handleAddDown}>افزودن</CustomButton>
                                        </div>
                                    </Row>
                                </div>
                                <div className="mt-4">


                                    {itemDown.map((item) => (
                                        <div key={item.id} style={{ display: "inline-block", margin: "4px" }}>
                                            <CustomChip item1={item.Drugname} item2={item.Number} item3={item.Injectionperiod} onDelete={() => setitemDown((prev) => prev.filter((i) => i.id !== item.id))} />

                                        </div>

                                    ))}

                                </div>
                                <div className={styles.btn}>
                                    <CustomButton className="mt-3" >ذخیره تغییرات</CustomButton>
                                </div>
                            </>
                        )}

                    </div>
                </Col>

            </Row>
        </Container>
    );
}
