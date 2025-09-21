import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Txt from "./Typo";
import userImage from "../../assets/image/83a0089e75cdbd7b546b5d540419337b9f0455bc.png";
import DynamicModal from "./modal";
import UserMenu from "./Menu";
import { eyesmenu, edit, activ, trash } from "../../assets/Icon/Icon";
import { Container, Row, Col } from 'react-bootstrap';

const Customcard = styled(Card)(() => ({
  boxShadow: "none",
  padding: "0px",
  borderRadius: "16px",
  backgroundColor: "#EDF1F2",
}));

const CardContents = styled(CardContent)({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px",
  "&:last-child": {
    paddingBottom: "8px",
  },
});

export default function BascCardi({ backcolor, img, data = [] }) {
  const copyData = [...data];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);
  const [copy, setcopy] = React.useState(copyData);

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
    setcopy(copy.filter((element) => element.id !== id));
  };

  return (
    <Row >
      {copy.length > 0 &&
        copy.map((element) => (
          <Col className="mb-3" item key={element.id} xs={12} sm={6} md={4} lg={12}>
            <Customcard sx={{ backgroundColor: backcolor || "#EDF1F2" }}>
              <CardContents>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "24px 12px 12px 24px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={img || userImage}
                      alt={element.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  <Box
                    sx={{
                      mr: "12px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Txt mycolor="#3D5252CC" mysize="14px" myweight="500" >
                      {element.name}
                    </Txt>

                    <Box
                      sx={{
                        mt: "8px",
                        backgroundColor: element.role === "فعال" ? "#4CAF50" : "#F44336",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "4px 12px",
                        textAlign: "center",
                        display: "inline-block",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Txt mycolor="#fff">{element.role}</Txt>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ pb: "8px", pr: "16px" }}>
                  <IconButton onClick={(e) => handleClick(e, element.id)}>
                    <MoreVertIcon />
                  </IconButton>

                  <UserMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedId === element.id}
                    onClose={handleClose}
                    items={[
                      {
                        label: "مشاهده پروفایل",
                        icon: eyesmenu,
                        onClick: () => {
                          setSelectedUser(element);
                          setModalType("view");
                          setOpenModal(true);
                        },
                      },
                      {
                        label: "ویرایش اطلاعات",
                        icon: edit,
                        onClick: () => {
                          setSelectedUser(element);
                          setModalType("edit");
                          setOpenModal(true);
                        },
                      },
                      {
                        label: element.role === "فعال" ? "غیرفعال کردن" : "فعال کردن",
                        icon: activ,
                        onClick: () => {
                          setcopy((prev) =>
                            prev.map((item) =>
                              item.id === element.id
                                ? {
                                    ...item,
                                    role: item.role === "فعال" ? "غیر فعال" : "فعال",
                                  }
                                : item
                            )
                          );
                        },
                      },
                      {
                        label: "حذف کاربر",
                        icon: trash,
                        onClick: () => deletItem(element.id),
                      },
                    ]}
                  />
                </Box>
              </CardContents>
            </Customcard>
          </Col>
        ))}

      <DynamicModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={modalType === "edit" ? "ویرایش اطلاعات کاربر" : "مشاهده پروفایل"}
        fields={[
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
        ]}
        initialValues={selectedUser || {}}
        readOnly={modalType === "view"}
        onSubmit={(newData) => {
          if (modalType === "edit") {
            setcopy((prev) =>
              prev.map((item) =>
                item.id === selectedUser.id ? { ...item, ...newData } : item
              )
            );
          }
          setSelectedUser(null);
        }}
      />
    </Row>
  );
}
