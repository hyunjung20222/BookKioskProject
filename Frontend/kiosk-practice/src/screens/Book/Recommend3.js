import React, { Component } from "react";
import { useStyles } from "../../styles";
import { Box, Grid } from "@material-ui/core";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Borrow_booklist from './Borrow_booklist';

const Borrow1 = () => {
    const styles = useStyles();
    return (
        <Box className={styles.center}>
            <Box className={[styles.TitleMessage, styles.padding]}>
                대여&nbsp;현황
            </Box>
            <Box className={styles.padding} />
            <Borrow_booklist />
            <Box className={[styles.TitleMessage, styles.padding]}>
            </Box>
            <Box className={[styles.TitleMessage]}>
                반납이&nbsp;완료되었습니다<br></br>
                감사합니다
            </Box>
            <Box className={[styles.miniMessage]}>
                잠시후&nbsp;메인화면으로<br></br>
                돌아갑니다
            </Box>

            <Footer />
        </Box>
    );
}

export default Borrow1;
