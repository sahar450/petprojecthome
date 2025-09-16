import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import userImage from "../../assets/image/83a0089e75cdbd7b546b5d540419337b9f0455bc.png";
import DynamicModal from "./modal";
import Txt from "./Typo";
import { Warning } from "../../assets/Icon/Icon";
const CustomCard = styled(Card)(() => ({
  boxShadow: "none",
  borderRadius: "16px",
  backgroundColor: "#EDF1F2",
  overflow: "hidden",
  direction: "rtl", 
  marginBottom: "12px", 

}));

const CardContents = styled(CardContent)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  "&:last-child": {
    paddingBottom: "12px",
  },
  direction: "rtl",
  textAlign: "right",
}));

export default function SupervisorCard({ data = [], img, flag = false }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  return (
    <>
      {data.map((item) => (
        <CustomCard key={item.id}>
          <CardContents>
            
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexGrow: 1,
                justifyContent: "flex-start",
                
              }}
            >
              <Box sx={{display: flag ? "block" :"none",}}>
                <Txt>{item.id}</Txt>
              </Box>
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  overflow: "hidden",
                  flexShrink: 0,

                }}
              >
                <img
                  src={img || userImage}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Txt sx={{ fontSize: "14px", fontWeight: 600, color: "#3D5252CC" }}>
                  {item.name}
                </Txt>
                <Box>
                  <Txt sx={{ fontSize: "12px", color: "#3D5252CC" }}>
                    {item.Category}
                  </Txt>
                </Box>
              </Box>


            </Box>

           
            <Box
              sx={{
                minWidth: "32px",
                display: flag ? "none" :"flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3D5252CC",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(item)}
            >
              <VisibilityOutlinedIcon />
            </Box>

          </CardContents>

          
          <Box
            sx={{
              backgroundColor: "#d6e8e8",
              padding: "6px 8px",
              textAlign: "right",
              fontSize: "12px",
              color: "#00796B",
              borderRadius: "32px",
              margin: "4px 8px",
              border: "1px solid #80CBC4",
              display: flag ? "none" :"flex",

            }}
          >
            <Box sx={{ ml: "5px" }}> <span> {Warning}</span></Box>
            {item.updatedAt || "ویزیت / ۱۵ تیر ۱۵:16"}
          </Box>
        </CustomCard>
      ))}

      
      {selectedItem && (
        <DynamicModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="مشاهده پروفایل"
          readOnly
          initialValues={{
            name: selectedItem.name,
            category: selectedItem.Category,
            updatedAt: selectedItem.updatedAt || "۱۵ تیر ۱۵:16",
          }}
          fields={[
            { type: "text", name: "name", label: "نام" },
            { type: "text", name: "category", label: "دسته‌بندی" },
            { type: "text", name: "updatedAt", label: "آخرین ویرایش" },
          ]}
        />
      )}
    </>
  );
}
