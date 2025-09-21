import React, { useState, useEffect } from "react";
import CrudTable from "../components/Material/CrudTable";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/MeetingsPage.module.css";
import { v4 as uuidv4 } from "uuid";
import { addicon } from "../assets/Icon/Icon";
import CustomButton from "../components/Material/Custombutton";
import DynamicModal from "../components/Material/modal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function MeetingsPage() {
  const columns = [
    { key: "code", label: "کد ملاقات" },
    { key: "name", label: "نام پت" },
    { key: "Veterinarian", label: "دامپزشک" },
    { key: "date", label: "تاریخ" },
    { key: "time", label: "ساعت" },
    { key: "city", label: "شهر" },
    { key: "Conditions", label: "وضعیت" },
  ];

  const initialData = [
    {
      id: uuidv4(),
      code: "1",
      name: "پمبه",
      Veterinarian: "علیرضا بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 0,
    },
    {
      id: uuidv4(),
      code: "2",
      name: "مانی",
      Veterinarian: "سهند بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 1,
    },
    {
      id: uuidv4(),
      code: "3",
      name: "خضبان",
      Veterinarian: "نازنین بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 2,
    },
    {
      id: uuidv4(),
      code: "4",
      name: "تست",
      Veterinarian: "امیر بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 3,
    },
    {
      id: uuidv4(),
      code: "5",
      name: "تست",
      Veterinarian: "زهرا بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 3,
    },
    {
      id: uuidv4(),
      code: "6",
      name: "تست",
      Veterinarian: "علیرضا بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 3,
    },
    {
      id: uuidv4(),
      code: "7",
      name: "تست",
      Veterinarian: "علیرضا بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 3,
    },
    {
      id: uuidv4(),
      code: "8",
      name: "تست",
      Veterinarian: "علیرضا بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 3,
    },
    {
      id: uuidv4(),
      code: "9",
      name: "تست",
      Veterinarian: "علیرضا بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 3,
    },
    {
      id: uuidv4(),
      code: "10",
      name: "تست",
      Veterinarian: "علیرضا بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 3,
    },
    {
      id: uuidv4(),
      code: "11",
      name: "تست",
      Veterinarian: "علیرضا بهرامی",
      date: "1402",
      time: "3:00",
      city: "ایلام",
      Conditions: 3,
    },
  ];

  const [dataTable, setDataTable] = useState(initialData);
  const [datacopy, setDatacopy] = useState(initialData);
  const [params, setParams] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const search = params.trim();
    const filtered = dataTable.filter((row) => {
      if (!search) {
        return true;
      }
      if (/^\d+$/.test(search)) {
        return row.code === search;
      }
      const lowerSearch = search.toLowerCase();
      return (
        row.code === search ||
        row.name.toLowerCase().includes(lowerSearch) ||
        row.Veterinarian.toLowerCase().includes(lowerSearch) ||
        row.date.toLowerCase().includes(lowerSearch) ||
        row.time.toLowerCase().includes(lowerSearch) ||
        row.city.toLowerCase().includes(lowerSearch)
      );
    });
    console.log("Search value:", search);
    console.log("Filtered results:", filtered);
    setDatacopy(filtered);
  }, [params, dataTable]);


  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAdd = (formData) => {
    const maxCode = Math.max(...dataTable.map((row) => parseInt(row.code, 10)));
    const newCode = (isNaN(maxCode) ? 1 : maxCode + 1).toString();
    const newRow = { ...formData, id: uuidv4(), code: newCode };
    setDataTable([newRow, ...dataTable]);
  };

  const addFields = [
    { name: "name", label: "نام پت", type: "text" },
    { name: "Veterinarian", label: "دامپزشک", type: "text" },
    { name: "date", label: "تاریخ", type: "text" },
    { name: "time", label: "ساعت", type: "text" },
    { name: "city", label: "شهر", type: "text" },
    {
      name: "Conditions",
      label: "وضعیت",
      type: "select",
      options: [
        { value: 0, label: "در انتظار" },
        { value: 1, label: "تایید شده" },
        { value: 2, label: "لغو شده" },
        { value: 3, label: "انجام شده" },
      ],
    },
  ];

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataTable);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meetings");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, "meetings.xlsx");
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0 p-0">
        <Col lg={12}>
          <div className={styles.mainBox}>
            <div>
              <h5 className={styles["mainBox-title"]}>ملاقات ها</h5>
            </div>
            <div className={styles["mainBox-head"]}>
              <div className={styles["mainBox-head-right"]}>
                <input
                  className={styles.inputmeet}
                  onChange={(e) => setParams(e.target.value)}
                  type="text"
                  placeholder="نام پت، دامپزشک یا کد ملاقات..."
                  value={params}
                />
               {/* <div className={styles.filterbtn}>
                 <CustomButton  colort="#00796B" bgcolor="#ffffff">
                  فیلتر
                </CustomButton>
               </div> */}
              </div>
              <div className={styles["mainBox-head-left"]}>
                <div>
                  <CustomButton
                    sx={{ marginLeft: "12px" }}
                    colort="#00796B"
                    bgcolor="#E1ECEE"
                    onClick={handleExportExcel}
                  >
                    خروجی اکسل
                  </CustomButton>
                </div>
                <div>
                  <CustomButton onClick={handleOpenModal}>
                    <span style={{ marginLeft: "10px" }}>{addicon}</span>{" "}
                    افزودن
                  </CustomButton>
                </div>
              </div>
            </div>

            <CrudTable columns={columns} data={datacopy} action={true} />
          </div>
        </Col>
      </Row>

      <DynamicModal
        open={modalOpen}
        onClose={handleCloseModal}
        title="افزودن ملاقات جدید"
        fields={addFields}
        initialValues={{}}
        onSubmit={handleAdd}
      />
    </Container>
  );
}
