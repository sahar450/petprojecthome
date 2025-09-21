import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Select,
  MenuItem,
  useMediaQuery
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Txt from "./Typo";
import UserMenu from "./Menu";
import DynamicModal from "./modal";
import { eyesmenu, edit, trash } from "../../assets/Icon/Icon";
import Pagination from "@mui/material/Pagination";

const ThheadCell = styled(TableCell)(() => ({
  backgroundColor: "#E0F2F1",
  direction: "rtl",
  textAlign: "right",
  fontWeight: 700,
  color: "#3D5252",
  fontFamily: "Yekan",
  fontSize: "14px",
  border: "none",
}));

const StyledPagination = styled(Pagination)(() => ({
  "& .MuiPagination-ul": {
    justifyContent: "center",
    direction: "rtl",
    gap: "6px",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: "50%",
    backgroundColor: "#F0F0F0",
    color: "#333",
    minWidth: "36px",
    height: "36px",
    fontFamily: "Yekan",
    fontSize: "13px",
    fontWeight: 500,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#E0E0E0",
    },
  },
  "& .Mui-selected": {
    backgroundColor: "#009688 !important",
    color: "#fff !important",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "#00897B !important",
    },
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

export default function CrudTable({
  head = [],
  columns = null,
  data = [],
  action = false,
  param = false
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const paginatedData = React.useMemo(() => {
    const sorted = [...tableData].sort((a, b) => {
      const codeA = parseInt(a.code, 10);
      const codeB = parseInt(b.code, 10);
      return codeA - codeB; 
    });
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, tableData]);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

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
    const fields = cols
      .filter((c) => c.key !== "code")
      .map((c) => {
        if (c.key === "Conditions") {
          return {
            name: c.key,
            label: c.label,
            type: "select",
            options: [
              { value: 0, label: "لغو شده" },
              { value: 1, label: "انجام شده" },
              { value: 2, label: "در انتظار" },
              { value: 3, label: "مرجوع شده" },
            ],
          };
        }
        return { name: c.key, label: c.label, type: "text" };
      });

    setModalConfig({
      open: true,
      title:
        mode === "view"
          ? "مشاهده اطلاعات"
          : mode === "edit"
            ? "ویرایش اطلاعات"
            : mode === "delete"
              ? "حذف اطلاعات"
              : "افزودن اطلاعات",
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

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(1);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#FBFBFB" }}>
      {/* Desktop Table */}
      {isDesktop && (
        <TableContainer component={Paper} sx={{ borderRadius: 0, overflow: "visible", boxShadow: "none", backgroundColor: "#FBFBFB" }}>
          <Table 
            sx={{ 
              direction: "rtl", 
              backgroundColor: "transparent", 
              boxShadow: "none",
              borderCollapse: "separate",
              borderSpacing: 0,
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "transparent" }}>
                {cols.map((c, i) => (
                  <ThheadCell
                    key={i}
                    sx={{
                      backgroundColor: "#E0F2F1",
                      border: "none",
                      p: 2,
                      fontFamily: "Yekan",
                      fontSize: "14px",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#3D5252",
                      position: "relative",
                      "&:first-of-type": {
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                      },
                      "&:last-of-type": {
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                      },
                    }}
                  >
                    {c.label}
                  </ThheadCell>
                ))}
                {action && (
                  <ThheadCell
                    sx={{
                      backgroundColor: "#E0F2F1",
                      border: "none",
                      p: 2,
                      fontFamily: "Yekan",
                      fontSize: "14px",
                      textAlign: "center",
                      fontWeight: 700,
                      color: "#3D5252",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      position: "relative",
                    }}
                  >
                    عملیات
                  </ThheadCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={row.id ?? Math.random()} sx={{ backgroundColor: "transparent" }}>
                  {cols.map((col, colIndex) => (
                    <TableCell
                      key={`${row.id}-${col.key}`}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#EDF1F2" : "#FFFFFF",
                        border: "none",
                        p: 2,
                        fontFamily: "Yekan",
                        fontSize: "14px",
                        textAlign: "right",
                        position: "relative",
                        "&:first-of-type": {
                          borderTopRightRadius: "12px",
                          borderBottomRightRadius: "12px",
                        },
                        "&:last-of-type": {
                          borderTopLeftRadius: "12px",
                          borderBottomLeftRadius: "12px",
                        },
                      }}
                    >
                      {renderCellValue(row, col)}
                    </TableCell>
                  ))}
                  
                  {action && (
                    <TableCell
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#EDF1F2" : "#FFFFFF",
                        border: "none",
                        p: 2,
                        fontFamily: "Yekan",
                        fontSize: "14px",
                        textAlign: "center",
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        position: "relative",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <IconButton 
                          onClick={() => openModal("view", row)}
                          sx={{ 
                            backgroundColor: "transparent", 
                          }}
                        >
                          {eyesmenu}
                        </IconButton>
                        <IconButton 
                          onClick={() => openModal("edit", row)}
                          sx={{ 
                            backgroundColor: "transparent", 
                          }}
                        >
                          {edit}
                        </IconButton>
                        <IconButton 
                          onClick={() => openModal("delete", row)}
                          sx={{ 
                            backgroundColor: "transparent", 
                          }}
                        >
                          {trash}
                        </IconButton>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Mobile Cards */}
      {!isDesktop &&
        paginatedData.map((row, index) => (
          <Box
            key={row.id}
            sx={{
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: index % 2 === 0 ? "#ffffff" : "#EDF1F2",
              mb: 2,
              p: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {action && (
              <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            )}

            {cols.map((col) => (
              <Box
                key={col.key}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 4,
                  mb: 1,
                }}
              >
                <Txt
                  mycolor="#444"
                  mysize="13px"
                  myweight="600"
                  myfont="Yekan"
                  sx={{ flex: "0 0 90px" }}
                >
                  {col.label}:
                </Txt>
                <Txt
                  mycolor="#333"
                  mysize="13px"
                  myweight="400"
                  myfont="Yekan"
                  sx={{ flex: 1 }}
                >
                  {renderCellValue(row, col)}
                </Txt>
              </Box>
            ))}
          </Box>
        ))}

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          
          alignItems: "center",
          p: 2,
          flexDirection: "row-reverse",
        }}
      >
         <StyledPagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
        <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} size="small" >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
       
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
            handleDelete(data);
          }
        }}
      />
    </Box>
  );
}
