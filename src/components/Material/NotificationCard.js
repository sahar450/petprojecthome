import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Txt from "./Typo";
import { Row, Col } from "react-bootstrap";
import {
  Message,
  Readingmessage,
  trashmessage,
} from "../../assets/Icon/Icon";

const Visitcard = styled(Card)(() => ({
  boxShadow: "none",
  padding: "12px 16px 16px 8px",
  borderRadius: "20px 20px 8px 8px",
  border: "1px solid #CDDDE0",
}));

const CardContents = styled(CardContent)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px",
  "&:last-child": {
    paddingBottom: "8px",
  },
}));

export default function NotificationCard({ data = [] }) {
  const [copy, setcopy] = React.useState([...data]);
  const [readIds, setReadIds] = React.useState([]); 

  const funRead = (id) => {
    setReadIds((prev) => [...prev, id]);
  };

  return (
    <Row>
      {copy.length > 0 &&
        copy.map((element) => {
          const isRead = readIds.includes(element.id);

          return (
            <Col
              className="mb-3"
              key={element.id}
              xs={12}
              sm={12}
              md={12}
              lg={12}
            >
              <Visitcard
                sx={{ backgroundColor: isRead ? "#ffffff" : "#E1ECEE" }}
              >
                <CardContents>
                  <Box>
                    <Box sx={{ display: "flex" }}>
                      <Box>{Message}</Box>
                      <Txt
                        mycolor="#3D5252CC"
                        mysize="14px"
                        myweight="400"
                        myfont="Yekan"
                        mymargin="0px 8px 0px 0px"
                      >
                        {element.text}
                      </Txt>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Txt
                          mycolor="#3D5252CC"
                          mysize="12px"
                          myweight="400"
                          mymargin="0px 2px 0px 8px"
                        >
                          {element.date}
                        </Txt>
                        <Txt
                          mycolor="#3D5252CC"
                          mysize="12px"
                          myweight="400"
                        >
                          {element.time}
                        </Txt>
                      </Box>

                      <Box sx={{ display: "flex" }}>
                      
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                         onClick={() =>  setcopy(prev => prev.filter(item => item.id !== element.id))}
                        >
                          {trashmessage}
                          <Txt
                            mycolor="#009688"
                            mysize="14px"
                            myfont="Yekan"
                            myweight="400"
                            mymargin="0px 8px 0px 0px"
                          >
                            حذف
                          </Txt>
                        </Box>

                      
                        {!isRead && (
                          <Box
                            onClick={() => funRead(element.id)}
                            sx={{
                              mr: "8px",
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            {Readingmessage}
                            <Txt
                              mycolor="#009688"
                              mysize="14px"
                              myfont="Yekan"
                              myweight="400"
                              mymargin="0px 8px 0px 0px"
                            >
                              خواندم
                            </Txt>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </CardContents>
              </Visitcard>
            </Col>
          );
        })}
    </Row>
  );
}
