import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import Txt from './Typo';

const Cardcustom = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  padding: " 16px",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  boxShadow: "none",
  margin: "0px 1px 11px 1px",

}));

export default function OutlinedCard({ icon, title, ditile, color, colorback }) {
  return (
    <Cardcustom sx={{
      height: {
        xs: 91,
        sm: 91,
        md: 85,
        lg: 85,
      },
    }}>

      <Box>
        <Box sx={{ display: { lg: "none", xs: "block" ,md:"none" } }}>
          <Txt mycolor="#3D5252CC" mysize="11px" myweight="400" myfont="Shabnam">
            {title}
          </Txt>
        </Box>
        <Box sx={{ display: "flex" , mt:"8px"}}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: colorback,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "20px",
              color: color
            }}
          >
            {icon}


          </Box>
          <Box>
            <Txt sx={{ display: { lg: "none", xs: "block",  md: "none"} ,whiteSpace:"nowrap"}} mycolor={color} mysize="13px" myweight="500" myfont="Shabnam" mymargin="8px 8px 0px 0px">
              {ditile}

            </Txt>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ padding: "0px !important", mr: "12px" }}>
        <Box sx={{ display: { lg: "block", md: "block", xs: "none" } }}>
          <Txt mycolor="#3D5252CC" mysize="12px" myweight="400" myfont="Shabnam">
            {title}
          </Txt>
          <Box>
            <Txt mycolor={color} mysize="18px" myweight="500" myfont="Shabnam" mymargin="8px 0px 0px 0px" sx={{ whiteSpace:"nowrap"}}>
              {ditile}

            </Txt>
          </Box>
        </Box>
      </CardContent>
    </Cardcustom>
  );
}
