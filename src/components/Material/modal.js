import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
  useMediaQuery,
  SwipeableDrawer,
} from "@mui/material";
import CustomInput from "./Input";
import CustomSelect from "./CustomSelect";
import { closeicon } from "../../assets/Icon/Icon";
import CustomButton from "./Custombutton";

const DynamicModal = ({
  open,
  onClose,
  title,
  fields,
  initialValues = {},
  onSubmit,
  readOnly = false,
  mode = "view",
}) => {
  const [formData, setFormData] = useState(initialValues);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const isFormValid = fields.every((field) => {
    if (field.type === "checkbox") return true;
    const value = formData[field.name];
    return value !== undefined && value !== null && value.toString().trim() !== "";
  });

  const content = (
    <Box>
      {/* Puller / handle برای کشیدن */}
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
          <Box
            sx={{
              width: 70,   // بزرگ‌تر
              height: 7,
              borderRadius: 2,
              bgcolor: "divider",
              mb: 1,
            }}
          />
        </Box>
      )}

      <Box px={3} pb={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" mb={2}>
            {title}
          </Typography>

          {/* فقط در دسکتاپ نمایش داده شود */}
          {!isMobile && (
            <Box onClick={onClose} sx={{ cursor: "pointer" }}>
              {closeicon}
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: "#2C302F66", borderBottomWidth: 2, my: 2 }} />

        {mode === "delete" ? (
          <Typography sx={{ fontSize: "15px" }}>
            آیا از حذف این مورد مطمئن هستید؟
          </Typography>
        ) : (
          fields.map((field, index) => {
            switch (field.type) {
              case "select":
                return (
                  <CustomSelect
                    key={index}
                    fullWidth
                    margin="normal"
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    options={field.options}
                    disabled={readOnly}
                    sx={{ mb: 2 }}
                  />
                );
              case "textarea":
                return (
                  <CustomInput
                    key={index}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    disabled={readOnly}
                    sx={{ mb: 2 }}
                  />
                );
              case "checkbox":
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        name={field.name}
                        checked={formData[field.name] || false}
                        onChange={handleChange}
                        disabled={readOnly}
                        sx={{ mb: 2 }}
                      />
                    }
                    label={field.label}
                  />
                );
              default:
                return (
                  <CustomInput
                    key={index}
                    fullWidth
                    margin="normal"
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    disabled={readOnly}
                    sx={{ mb: 2 }}
                  />
                );
            }
          })
        )}

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <CustomButton
            bgcolor="#0000001F"
            colort="#00000061"
            hoverBg="#009688"
            hoverColor="#fff"
            onClick={onClose}
            variant="outlined"
          >
            انصراف
          </CustomButton>

          {mode === "delete" ? (
            <CustomButton
              onClick={handleSubmit}
              variant="contained"
              bgcolor="#0000001F"
              colort="#00000061"
              hoverBg="#009688"
              hoverColor="#fff"
            >
              حذف
            </CustomButton>
          ) : !readOnly && (
            <CustomButton
              onClick={handleSubmit}
              variant="contained"
              disabled={!isFormValid}
              bgcolor="#0000001F"
              colort="#00000061"
              hoverBg="#009688"
              hoverColor="#fff"
            >
              ثبت
            </CustomButton>
          )}
        </Box>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={() => { }}
        swipeAreaWidth={30}
        hysteresis={0.3}
        PaperProps={{
          style: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "90vh",
          },
        }}
      >
        {content}
      </SwipeableDrawer>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          pt: "24px",
          borderRadius: "20px",
          boxShadow: 24,
        }}
      >
        {content}
      </Box>
    </Modal>
  );
};

export default DynamicModal;
