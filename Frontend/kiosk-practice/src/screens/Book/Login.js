import React, { useState } from "react";
import { useStyles } from "../../styles";
import { Box, CardActionArea, Fade, Grid } from "@material-ui/core";

import logo from "../../images/homeBtn.svg";
import QrImg from "../../images/QrImg.jpg";

import Timer from './Timer';
import { ReactComponent as Home } from "../../images/homeBtn.svg";

import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
    const styles = useStyles();
    const navigate = useNavigate();

    return (
        <Fade in={true}>
            <CardActionArea>
                <Box className={styles.center}>
                    <Box className={[styles.TitleMessage, styles.padding]}>
                        Qr 코드를 인식해주세요
                    </Box>
                    <Grid container="container">
                        <Grid item="item" sm={12} className={styles.footer}>
                            <img style={{padding:220}} alt="Qr코드" src={QrImg} />
                        </Grid>
                    </Grid>
                    <Timer sec="10" />
                    <meta http-equiv="refresh" content="10; url=http://localhost:3000/book/main" />
                    <Home style={{padding:50}} className={styles.HomeButton} onClick={() => navigate("/book/main")} />

                </Box>
            </CardActionArea>
        </Fade>
    );
}
