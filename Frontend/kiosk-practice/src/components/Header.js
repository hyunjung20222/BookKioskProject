import React, { useEffect, useState } from "react";
import { useStyles } from "../styles";
import { Box, Grid } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Home } from "../images/homeBtn.svg";
import { ReactComponent as Back } from "../images/backBtn.svg";

const Header = () => {
  const styles = useStyles();
  const sampleLocation = useLocation();
  const navigate = useNavigate();
  console.log(sampleLocation.pathname.slice(13, 26));
  const [book, setBook] = useState([]);
  const regex = /[0-9]/g; //숫자만 추출

  // const getBook = async () => {
  //   const json = await (
  //     await fetch(
  //       `http://i7d211.p.ssafy.io:8081/book/detail?ISBN=${sampleLocation.pathname
  //         .slice(13, 26)}`
  //     )
  //   ).json();
  //   setBook(json);
  //   console.log(sampleLocation.pathname)
  // };

  // useEffect(() => {
  //   getBook();
  // }, []);

  return (
    <Box>
      <Grid item="item" sm={12} className={styles.Header}>
        <Home
          className={styles.TitleButton}
          onClick={() => navigate("/book/main")}
        />{" "}
        {sampleLocation.pathname === "/book/borrow" ? (
          <Box className={styles.TitleMessage}>대여</Box>
        ) : sampleLocation.pathname === "/book/return" ? (
          <Box className={styles.TitleMessage}>반납</Box>
        ) : sampleLocation.pathname === "/book/recommend" ? (
          <Box className={styles.TitleMessage}>추천</Box>
        ) : sampleLocation.pathname === "/book/recommend/age" ? (
          <Box className={styles.TitleMessage}>추천</Box>
        ) : sampleLocation.pathname === "/book/search" ? (
          <Box className={styles.TitleMessage}>검색</Box>
        ) : sampleLocation.pathname === "/book/searchresult" ? (
            <Box className={styles.TitleMessage}>검색결과</Box>  
        ) : sampleLocation.pathname.slice(0,12) === "/book/detail" ? (
            <Box className={styles.TitleMessage}>도서상세</Box>
        ) : <></>}
        <Back className={styles.TitleButton} onClick={() => navigate(-1)} />
      </Grid>
    </Box>
  );
};

export default Header;
