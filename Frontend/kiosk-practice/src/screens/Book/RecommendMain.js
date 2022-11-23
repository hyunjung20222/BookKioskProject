import React, { useEffect, useState } from "react";
import { useStyles } from "../../styles";
import { Box, CardActionArea, Fade } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import emotions from "../../images/emotions.png";
import agegroup from "../../images/agegroup.png";

import axios from "axios";

export default function RecommendMain(props) {
  const styles = useStyles();
  const navigate = useNavigate();

  // const getFace = (facedata) => {   console.log(facedata)   axios
  // .get("http://i7d211.p.ssafy.io:8081/book/emotion", {           params: {
  // emotion: facedata           }       })       .then(function (response) {
  // props.setFaces(response.data)           console.log(props.faces) return
  // })   } useEffect(() => {   socket.on('faceoutput', (data) => {
  // console.log(data)       getFace(data)   })   return() => { socket.close()   }
  // }, [sockets]);

  return (
    <Fade in={true}>
      <CardActionArea>
        <Box className={[styles.center]}>
          <Header />
          <Box>
            <Box
              sx={{
                padding: 130,
              }}
            ></Box>
            <Box
              sx={{
                fontFamily: "'Noto Sans'",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "5rem",
                color: "#FFFFFF",
                textShadow:
                  "0 16px 40px rgba(0, 0, 0, 0.25), 0 16px 40px #6068BE",
              }}
            >
              추천 방식을 선택하세요
            </Box>
            <Box
              sx={{
                padding: 60,
              }}
            ></Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                height: 1030,
                marginBottom: 400,
              }}
            >
              <Button
                onClick={() => {
                  props.setScreen(1);
                }}
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(180deg, #353F6B 0%, #353F6B 0.01%, #223069 100%)",
                  borderRadius: "60px",
                  padding: 10,
                  height: 750,
                  width: 500,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "20px 60px 40px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Box>
                  <img
                    src={emotions}
                    alt="emotions"
                    style={{
                      width: "90%",
                      height: "100%",
                    }}
                  ></img>
                  <Box
                    sx={{
                      padding: 30,
                    }}
                  ></Box>
                  <Box
                    sx={{
                      fontFamily: "'Noto Sans'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "50px",
                      color: "#FFFFFF",
                      textShadow:
                        "0 16px 40px rgba(0, 0, 0, 0.25), 0 16px 40px #6068BE",
                    }}
                  >
                    감정인식 추천
                  </Box>
                </Box>
              </Button>
              <Button

                onClick={() => {
                  props.setScreen(2)
                }}
                variant="contained"
                size="large"
                sx={{
                  background:
                    "linear-gradient(180deg, #353F6B 0%, #353F6B 0.01%, #223069 100%)",
                  borderRadius: "60px",
                  padding: 10,
                  height: 750,
                  width: 500,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "20px 60px 40px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Box>
                  <img
                    src={agegroup}
                    alt="agegroup"
                    style={{
                      width: "90%",
                      height: "100%",
                    }}
                  ></img>
                  <Box
                    sx={{
                      padding: 30,
                    }}
                  ></Box>
                  <Box
                    sx={{
                      fontFamily: "'Noto Sans'",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "50px",
                      color: "#FFFFFF",
                      textShadow:
                        "0 16px 40px rgba(0, 0, 0, 0.25), 0 16px 40px #6068BE",
                    }}
                  >
                    연령대별 추천
                  </Box>
                </Box>
              </Button>
            </Box>
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </CardActionArea>
    </Fade>
  );
}
