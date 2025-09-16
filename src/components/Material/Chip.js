import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import "../../assets/css/global.css";
import { chilpDeleteIcon } from "../../assets/Icon/Icon";
const ChipCard = styled(Chip)(({ theme, bgcolor, colortxt, radius }) => ({
    borderRadius: radius || "88px",
    padding: "8px 16px",
    backgroundColor: bgcolor || "#E1910C33",
    display: "flex",
    justifyContent: "flex-start",
    boxShadow: "none",
    margin: "0px 1px 11px 1px",
    color: colortxt || "#D26900",
    fontFamily: 'Yekan',
    fontSize: "12px"


}));
export default function CustomChip({ item1, item2, item3, item4="", onDelete, ...props }) {
    return (
        <ChipCard
            label={`${item1} - ${item2} - ${item3} - ${item4}`}
            onDelete={onDelete}
            deleteIcon={chilpDeleteIcon}
        />

    );
}
