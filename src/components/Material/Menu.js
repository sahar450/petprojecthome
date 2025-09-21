import React from "react";
import { Menu, MenuItem } from "@mui/material";
import Txt from "./Typo";

const UserMenu = ({ anchorEl, open, onClose, items }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
        },
      }}
    >
      {items.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.icon && <span>{item.icon}</span>}
          <Txt
            mycolor="#3D5252"
            mysize="14px"
            myweight="400"
            myfont="Yekan"
            mymargin="0px 14.21px 0px 64px"
          >
            {item.label}
          </Txt>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default UserMenu;
