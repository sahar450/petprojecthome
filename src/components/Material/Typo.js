import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import '../../assets/css/global.css'
const Txt = styled(Typography)(({
  theme,
  mycolor,
  mysize,
  myweight,
  myfont,
  mypadding,
  mymargin,
  mydisplay,
  myalign
}) => ({
  fontFamily: myfont || "Shabnam" ,  
  color: mycolor || "#627B7C",
  fontSize: mysize || "12px",
  fontWeight: myweight || 300,
  padding: mypadding || 0,
  margin: mymargin || 0,
  display: mydisplay || "inline-flex",
  alignItems: myalign || "center",
  justifyContent: "center",
 
}));

export default Txt;
