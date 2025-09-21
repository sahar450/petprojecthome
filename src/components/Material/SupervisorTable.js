import * as React from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";

import Txt from "./Typo";
import UserMenu from "./Menu";
import DynamicModal from "./modal";
import "../../assets/css/global.css";
import { eyesmenu, edit, trash ,Calendarـsupervisor,timer_su,pet_su,user_sup} from "../../assets/Icon/Icon";

const colIcons = {
  date: Calendarـsupervisor,
  time: timer_su,
  pet: pet_su ,
  doctor: user_sup,
};

export default function SupervisorTable({
  columns = null,
  data = [],
  action = true,
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
  });

  const isMobile = useMediaQuery("(max-width:768px)");

  React.useEffect(() => setTableData(data), [data]);

  const cols = React.useMemo(() => {
    if (Array.isArray(columns) && columns.length) return columns;

    if (tableData?.length) {
      const keys = Object.keys(tableData[0]).filter((k) => k !== "id");
      return keys.map((k) => ({ key: k, label: k }));
    }
    return [];
  }, [columns, tableData]);

  const renderCellValue = (row, col) => {
    const raw = row ? row[col.key] : undefined;
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
  
    const fields = cols.map((c) => ({
      name: c.key,
      label: c.label,
      type: "text",
    }));

    setModalConfig({
      open: true,
      title: mode === "view" ? "مشاهده اطلاعات" : "ویرایش اطلاعات",
      fields,
      initialValues: row,
      readOnly: mode === "view",
    });
  };
  const handleModalClose = () =>
    setModalConfig((prev) => ({ ...prev, open: false }));


  const handleDelete = (row) =>
    setTableData((prev) => prev.filter((item) => item.id !== row.id));

  return (
    <Box sx={{ width: "100%", backgroundColor: "transparent", p: 1 }}>
      {tableData.map((row) => (
        <Box
          key={row.id ?? Math.random()}
          sx={{
            backgroundColor: "#e2f1f0",
            borderRadius: "16px 16px 8px 8px",
            p: 2,
            mb: 1.5,
            position: "relative",
            border:"1px soild #009688",
          }}
        >
      
          {action && (
            <Box sx={{ position: "absolute", top: 8, left: 8 }}>
              <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          )}

        
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              {cols.map((col, ci) => (
                <Box
                  key={`${row.id ?? ci}-${col.key}`}
                  sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}
                >
                  {colIcons[col.key] ?? null}
                  <Txt
                    mycolor="#333"
                    mysize="13px"
                    myweight="500"
                    myfont="Yekan"
                  >
                    {renderCellValue(row, col)}
                  </Txt>
                </Box>
              ))}
            </Box>
          )}

      
          {isMobile && (
            <Box>
              {cols.map((col, ci) => (
                <Box
                  key={`${row.id ?? ci}-${col.key}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  {colIcons[col.key] ?? null}
                  <Txt
                    mycolor="#333"
                    mysize="13px"
                    myweight="500"
                    myfont="Yekan"
                  >
                    {renderCellValue(row, col)}
                  </Txt>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}

      <UserMenu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        items={[
          {
            icon: eyesmenu,
            label: "مشاهده",
            onClick: () => openModal("view", selectedRow),
          },
          {
            icon: edit,
            label: "ویرایش",
            onClick: () => openModal("edit", selectedRow),
          },
          { icon: trash, label: "حذف", onClick: () => handleDelete(selectedRow) },
        ]}
      />

     
      <DynamicModal
        open={modalConfig.open}
        onClose={handleModalClose}
        title={modalConfig.title}
        fields={modalConfig.fields}
        initialValues={modalConfig.initialValues}
        readOnly={modalConfig.readOnly}
        onSubmit={(data) =>
          setTableData((prev) =>
            prev.map((item) => (item.id === data.id ? data : item))
          )
        }
      />
    </Box>
  );
}
