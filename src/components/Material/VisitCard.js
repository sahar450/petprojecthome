import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Txt from "./Typo";
import DynamicModal from "./modal";
import UserMenu from "./Menu";
import { Startvisit, Cancelappointment, trash } from "../../assets/Icon/Icon";
import { Row, Col } from 'react-bootstrap';

const Visitcard = styled(Card)(() => ({
  boxShadow: "none",
  padding: "0px",
  borderRadius: "16px",
  border: "1px solid #80CBC4",
}));

const CardContents = styled(CardContent)({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px",
  "&:last-child": {
    paddingBottom: "8px",
  },
});

export default function VisitcardCardi({ data = [] }) {
  const [copy, setCopy] = React.useState([...data]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("edit");
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const deletItem = (id) => {
    setCopy(copy.filter((element) => element.id !== id));
  };

  return (
    <Row>
      {copy.length > 0 &&
        copy.map((element) => (
          <Col className="mb-3" key={element.id} xs={12} sm={12} md={12} lg={12}>
            <Visitcard>
              <CardContents sx={{ background: element.item ? "#fbfbfb" : "#e2f1f0" }}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "baseline",
                  marginTop: "9px"
                }}>
                  <Box>
                    <Txt mycolor="#3D5252" mysize="16px" myweight="400" mymargin="0px 0px 0px 27px">
                      {element.time}
                    </Txt>
                  </Box>
                  <Box>
                    <span>{element.icon}</span>
                    <Txt mycolor={element.item ? "#3D5252" : "#00796B"} mysize="12px" myweight="400" mymargin="0px 4px 0px 0px">
                      {element.details}
                    </Txt>
                  </Box>
                </Box>

                <Box sx={{ pb: "8px", pr: "16px", display: "flex", alignItems: "center" }}>
                  <IconButton onClick={(e) => handleClick(e, element.id)}>
                    <MoreVertIcon sx={{ display: element.item ? "none" : "block" }} />
                  </IconButton>

                  <Box sx={{ display: element.item ? "block" : "none" }}>
                    <IconButton onClick={() => deletItem(element.id)}>
                      {trash}
                    </IconButton>
                  </Box>

                  <UserMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedId === element.id}
                    onClose={handleClose}
                    items={[
                      {
                        label: "شروع ملاقات",
                        icon: Startvisit,
                        onClick: () => {
                          setCopy((prev) =>
                            prev.map((item) =>
                              item.id === element.id ? { ...item, details: "شروع ملاقات" } : item
                            )
                          );
                          handleClose();
                        },
                      },
                      {
                        label: "لغو ملاقات",
                        icon: Cancelappointment,
                        onClick: () => {
                          setSelectedUser(element);
                          setModalType("cancel");
                          setOpenModal(true);
                          handleClose();
                        },
                      },
                    ]}
                  />
                </Box>
              </CardContents>
            </Visitcard>
          </Col>
        ))}

      <DynamicModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={
          modalType === "edit"
            ? "ویرایش اطلاعات کاربر"
            : modalType === "cancel"
            ? "علت لغو ملاقات"
            : "مشاهده پروفایل"
        }
        fields={
          modalType === "cancel"
            ? [
                {
                  type: "textarea",
                  name: "reason",
                  label: "علت لغو",
                },
              ]
            : [
                { type: "text", name: "name", label: "نام" },
                {
                  type: "select",
                  name: "role",
                  label: "وضعیت",
                  options: [
                    { value: "فعال", label: "فعال" },
                    { value: "غیر فعال", label: "غیر فعال" },
                  ],
                },
              ]
        }
        initialValues={selectedUser || {}}
        readOnly={modalType === "view"}
        onSubmit={(newData) => {
          if (modalType === "edit") {
            setCopy((prev) =>
              prev.map((item) =>
                item.id === selectedUser.id ? { ...item, ...newData } : item
              )
            );
          }

          if (modalType === "cancel") {
            setCopy((prev) =>
              prev.map((item) =>
                item.id === selectedUser.id
                  ? { ...item, details: `لغو ملاقات (${newData.reason})` }
                  : item
              )
            );
          }

          setSelectedUser(null);
          setOpenModal(false);
        }}
      />
    </Row>
  );
}
