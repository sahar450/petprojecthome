import * as React from "react";

import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Box, IconButton
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Txt from "./Typo";
import UserMenu from "./Menu";
import DynamicModal from "./modal";
import "../../assets/css/global.css";
import { eyesmenu, edit, trash } from "../../assets/Icon/Icon";

const ThheadCell = styled(TableCell)(() => ({
  backgroundColor: "#E0F2F1",
  direction: "rtl",
  textAlign: "right",
  fontWeight: 700,
  color: "#3D5252",
  fontFamily: 'Yekan',
  fontSize: "14px",
  border: "none",
  position: "relative",
  "&:first-of-type": {
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  "&:last-of-type": {
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
  },
}));

const ThCell = styled(TableCell)(() => ({
  direction: "rtl",
  textAlign: "right",
  color: "#627B7C",
  fontFamily: "Yekan",
  fontSize: "14px",
  fontWeight: 400,
  border: "none",
  backgroundClip: "border-box",
  position: "relative",
  "&:first-of-type": {
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  "&:last-of-type": {
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
  },
}));

const getConditionBox = (condition) => {
  let bg = "";
  let text = "";

  switch (condition) {
    case 0: bg = "#F44336"; text = "لغو شده"; break;
    case 1: bg = "#4CAF50"; text = "انجام شده"; break;
    case 2: bg = "#FF9800"; text = "در انتظار"; break;
    case 3: bg = "#F44336"; text = "مرجوع شده"; break;
    default: bg = "#e0e0e0"; text = "نامشخص";
  }

  return (
    <Box
      sx={{
        backgroundColor: bg,
        color: "#fff",
        p: "6px 12px",
        borderRadius: "8px",
        display: "inline-block",
      }}
    >
      <Txt mycolor="#FFFFFF" mysize="12px" myweight="500" myfont="Yekan">
        {text}
      </Txt>
    </Box>
  );
};

export default function StickyHeadTable({
  head = [],
  columns = null,
  data = [],
  action = false,
  param = false
}) {
  const [tableData, setTableData] = React.useState(data);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [modalConfig, setModalConfig] = React.useState({
    open: false,
    title: "",
    fields: [],
    initialValues: {},
    readOnly: false,
    mode: "view",
  });

  React.useEffect(() => setTableData(data), [data]);

  const cols = React.useMemo(() => {
    if (Array.isArray(columns) && columns.length) return columns;

    if (head.length && tableData?.length) {
      const keys = Object.keys(tableData[0]).filter((k) => k !== "id");
      const minLen = Math.min(keys.length, head.length);
      const inferred = [];
      for (let i = 0; i < minLen; i++)
        inferred.push({ key: keys[i], label: head[i] });
      for (let i = minLen; i < keys.length; i++)
        inferred.push({ key: keys[i], label: keys[i] });
      return inferred;
    }

    if (tableData?.length) {
      const keys = Object.keys(tableData[0]).filter((k) => k !== "id");
      return keys.map((k) => ({ key: k, label: k }));
    }

    return [];
  }, [columns, head, tableData]);

  const renderCellValue = (row, col) => {
    const key = col.key;
    const raw = row ? row[key] : undefined;
    if (key === "Conditions") return getConditionBox(raw);
    if (typeof raw === "function") return raw();
    return raw ?? "-";
  };

  const handleOpenMenu = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const openModal = (mode, row) => {
    let fields = cols.map((c) => {
      if (c.key === "Conditions") {
        return {
          name: "Conditions",
          label: "وضعیت",
          type: "select",
          options: [
            { value: 0, label: "لغو شده" },
            { value: 1, label: "انجام شده" },
            { value: 2, label: "در انتظار" },
            { value: 3, label: "مرجوع شده" },
          ],
        };
      }
      return {
        name: c.key,
        label: c.label,
        type: "text",
      };
    });

    if (mode === "cancel") {
      fields = [
        { type: "textarea", name: "reason", label: "علت لغو" }
      ];
    }

    setModalConfig({
      open: true,
      title:
        mode === "view"
          ? "مشاهده اطلاعات"
          : mode === "edit"
            ? "ویرایش اطلاعات"
            : mode === "delete"
              ? "حذف اطلاعات"
              : mode === "cancel"
                ? "علت لغو ملاقات"
                : "مودال",
      fields,
      initialValues: row,
      readOnly: mode === "view",
      mode,
    });
  };

  const handleModalClose = () =>
    setModalConfig((prev) => ({ ...prev, open: false }));

  const handleDelete = (row) =>
    setTableData((prev) => prev.filter((item) => item.id !== row.id));

  return (
    <Box sx={{ width: "100%", backgroundColor: "#FBFBFB" }}>
      <Box sx={{ display: param ? "none" : { xs: "none", md: "block" }, backgroundColor: "#FBFBFB" }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0, overflow: "visible", boxShadow: "none", backgroundColor: "#FBFBFB" }}>
          <Table
            stickyHeader
            sx={{
              direction: "rtl",
              backgroundColor: "#FBFBFB",
              border: "none",
              borderCollapse: "separate",
              borderSpacing: 0,
              "& tbody tr": {
                position: "relative",
                marginBottom: "8px",
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "transparent" }}>
                {cols.map((c, i) => (
                  <ThheadCell key={i}>
                    {c.label}
                  </ThheadCell>
                ))}
                {action && <ThheadCell>عملیات</ThheadCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ 
                    backgroundColor: "transparent",
                    "& td": {
                      border: "none",
                      backgroundColor: index % 2 === 0 ? "#EDF1F2" : "#FFFFFF",
                    },
                  }}
                >
                  {cols.map((col, ci) => (
                    <ThCell key={`${row.id}-${col.key}`} sx={{ p: 1.5 }}>
                      {renderCellValue(row, col)}
                    </ThCell>
                  ))}
                  {action && (
                    <ThCell sx={{ p: 1.5 }}>
                      <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                        <MoreVertIcon />
                      </IconButton>
                    </ThCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ display: param ? "block" : { xs: "block", md: "none" }, p: 1 }}>
        {tableData.map((row) => (
          <Box
            key={row.id}
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: row.id % 2 === 0 ? "#ffffff" : "#EDF1F2",
              mb: "5px",
              p: 2,
              boxShadow: "none",
              position: "relative",
            }}
          >
            {action && (
              <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            )}
            {cols.map((col, ci) => (
              <Box
                key={`${row.id}-${col.key}`}
                sx={{ display: "flex", justifyContent: "flex-start", mb: 1, pb: 0.5 }}
              >
                <Txt
                  mycolor="#444"
                  mysize="13px"
                  myweight="600"
                  myfont="Yekan"
                  sx={{ display: "inline-block", minWidth: "88px" }}
                >
                  {col.label}:
                </Txt>
                <Txt mycolor="#627B7C" mysize="13px" myweight="400" myfont="Yekan">
                  {renderCellValue(row, col)}
                </Txt>
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <UserMenu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        items={[
          { icon: eyesmenu, label: "مشاهده", onClick: () => openModal("view", selectedRow) },
          { icon: edit, label: "ویرایش", onClick: () => openModal("edit", selectedRow) },
          { icon: trash, label: "حذف", onClick: () => openModal("delete", selectedRow) },
        ]}
      />

      <DynamicModal
        open={modalConfig.open}
        onClose={handleModalClose}
        title={modalConfig.title}
        fields={modalConfig.fields}
        initialValues={modalConfig.initialValues}
        readOnly={modalConfig.readOnly}
        mode={modalConfig.mode}
        onSubmit={(data) => {
          if (modalConfig.mode === "edit") {
            setTableData((prev) =>
              prev.map((item) => (item.id === data.id ? data : item))
            );
          } else if (modalConfig.mode === "delete") {
            handleDelete(modalConfig.initialValues);
          } else if (modalConfig.mode === "cancel") {
            setTableData((prev) =>
              prev.map((item) =>
                item.id === modalConfig.initialValues.id
                  ? { ...item, details: `لغو ملاقات (${data.reason})` }
                  : item
              )
            );
          }
        }}
      />
    </Box>
  );
}
