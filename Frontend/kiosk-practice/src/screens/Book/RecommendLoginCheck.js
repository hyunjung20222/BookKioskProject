import {
  Box,
  Button,
  CardActionArea,
  Fade,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useStyles } from "../../styles";
import CardPayment from "../../images/card-payment.png";
import io from "socket.io-client";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function RecommendLoginCheck(props) {
  const styles = useStyles();
  const navigate = useNavigate();
  const [sockets, setSockets] = useState([]);
  const socket = io.connect("http://localhost:9994");
  const [info, setInfo] = useState("");
  const RecommendWithLogin = async (token) => {
    console.log("HELP ME");
    const headers = {
      "X-AUTH-TOKEN": token,
    };
    axios
      .get("/book/emotionLogin", {
        params: {
          emotion: props.emotion,
        },
        headers: headers, // headers에 headers 객체 전달
      })
      .then(function (response) {
        console.log(response.data);
        props.setBookList(response.data)
      });
  };
  const RecommendWithoutLogin = async () => {
    const json = await (
      await fetch(`/book/emotion?emotion=${props.emotion}`)
    ).json();
    props.setBookList(json);
  };
  useEffect(() => {
    if ( info === "" ) {
    socket.emit("inputdata", 4);
    socket.on("isbnoutput", (data) => {
      console.log(data);
      setInfo(data);
    })} else {
      submit();}
    return () => {
      socket.close();
    };}
  , [info]);

  const submit = async () => {
    // const { email, password } = {
    //   email: "sanggom@ssaty.com",
    //   password: "sanggom1234!",
    // };

    const { email, password } = {
      email: info.slice(0, info.indexOf("//")),
      password: info.slice(info.indexOf("//") + 2),
    };
    try {
      const { data } = await axios.post("/user/login", { email, password });
      console.log(data);
      if (data.token) {
        console.log(data.token);
        RecommendWithLogin(data.token);
        console.log(data.token);
      } else {
        alert("이메일 혹은 비밀번호가 틀렸습니다.");
      }
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      console.log(e);
    }
  };

  return (
    <Fade in={true}>
      <CardActionArea>
        <Box className={[styles.center]}>
          <Box>
            <img
              onClick={() => submit()}
              src={CardPayment}
              alt="CardPayment"
              style={{ width: 400, height: 400, marginTop: 360 }}
            ></img>
            <Box className={styles.TitleMessage}>Book극성 회원이신가요?</Box>
            <Box
              style={{ marginTop: 50, marginBottom: 50 }}
              className={styles.TitleMessage}
            >
              카드를 대주세요!
            </Box>
            <Box className={styles.subTitleMessage}>대여 이력을 활용해</Box>
            <Box style={{ marginTop: -50 }} className={styles.subTitleMessage}>
              더욱 정확한 도서 추천을 받아보실 수 있습니다!
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                height: 400,
                marginBottom: 300,
              }}
            >
              <Button
                onClick={() => {
                  RecommendWithoutLogin(props.emotion);
                  console.log(props.BookList);
                }}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#233173",
                  borderRadius: 10,
                  height: 300,
                  width: 700,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 24,
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 80 }}>로그인없이 진행</Typography>
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
