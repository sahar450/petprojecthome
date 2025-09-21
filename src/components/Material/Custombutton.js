import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import '../../assets/css/global.css';

const BaseButton = styled(Button)(({ bgcolor, colort, hoverBg, hoverColor }) => {
  const styles = {
    borderRadius: "100px",
    textTransform: "none",
    padding: "11px 20px",
    fontWeight: 500,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "center",
    height: "44px",
    margin: "0px",
    fontFamily: "Yekan",
    fontSize: "14px",
    transition: "0.3s all",
    border: "none",
    backgroundColor: bgcolor || "#009688",
    color: colort || "#fff",
    width: "auto",
    maxWidth: "328px",
    "&.Mui-disabled": {
      backgroundColor: "#0000001F",
      color: "#00000061",
      cursor: "not-allowed",
    },
    boxShadow: "none",
  };

  if (hoverBg || hoverColor) {
    styles["&:hover"] = {
      backgroundColor: hoverBg || bgcolor,
      color: hoverColor || colort,
    };
  }

  return styles;
});

export default function CustomButton({ children, sx, ...props }) {
  return (
    <BaseButton disableRipple sx={sx} {...props}>
      {children}
    </BaseButton>
  );
}
