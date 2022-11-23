import React from "react";
import {useStyles} from "../styles";
import {ReactComponent as BtnMiniReturn} from "../images/btnmini-return.svg";
import {ReactComponent as BtnMiniReturnPressed} from "../images/btnmini-return-pressed.svg";
import {ReactComponent as BtnMiniRental} from "../images/btnmini-rental.svg";
import {ReactComponent as BtnMiniRentalPressed} from "../images/btnmini-rental-pressed.svg";
import {ReactComponent as BtnMiniSearch} from "../images/btnmini-search.svg";
import {ReactComponent as BtnMiniSearchPressed} from "../images/btnmini-search-pressed.svg";
import {ReactComponent as BtnMiniRecommend} from "../images/btnmini-recommend.svg";
import {ReactComponent as BtnMiniRecommendPressed} from "../images/btnmini-recommend-pressed.svg";
import {Box, Grid} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom"

// function move(type) {     if (type === 1) {         socket.emit("send opper",
// "1");     } else if (type === 2) {         socket.emit("send opper", "2"); }
// else if (type === 3) {         socket.emit("send opper", "3");     } else {
// socket.emit("send opper", "4");     } }

import io from "socket.io-client";
const socket = io.connect("http://localhost:9994");

const Footer = () => {
    const styles = useStyles();
    const sampleLocation = useLocation();
    const navigate = useNavigate();

    const sendMsg = (answer) => {
        console.log(answer);
        socket.emit("inputdata", answer);
    };

    return (
        <Box >
            {
                sampleLocation.pathname === "/book/main"
                    ? <Box className={[styles.MainButtons]}>
                            <Grid item="item" sm={12}>
                                <BtnMiniRental
                                    className={styles.MainButton}
                                    onClick={() => {
                                        navigate("/book/borrow");
                                        sendMsg(1)
                                    }}/>
                                <BtnMiniReturn
                                    className={styles.MainButton}
                                    onClick={() => {
                                        navigate("/book/return");
                                        sendMsg(0)
                                    }}/>
                            </Grid>
                            <Grid item="item" sm={12}>
                                <BtnMiniRecommend
                                    className={styles.MainButton}
                                    onClick={() => {
                                        navigate("/book/recommend");
                                    }}/>
                                <BtnMiniSearch
                                    className={styles.MainButton}
                                    onClick={() => {
                                        navigate("/book/search")
                                    }}/>
                            </Grid>
                        </Box>
                    : <Grid item="item" sm={12} className={styles.footer}>
                            {
                                sampleLocation.pathname === "/book/borrow"
                                    ? <BtnMiniRentalPressed className={styles.MiniButton}/>
                                    : <BtnMiniRental
                                            className={styles.MiniButton}
                                            onClick={() => {
                                                navigate("/book/borrow");
                                                sendMsg(1)
                                            }}/>
                            }
                            {
                                sampleLocation.pathname === "/book/return"
                                    ? <BtnMiniReturnPressed className={styles.MiniButton}/>
                                    : <BtnMiniReturn
                                            className={styles.MiniButton}
                                            onClick={() => {
                                                navigate("/book/return");
                                                sendMsg(0)
                                            }}/>
                            }
                            {
                                sampleLocation.pathname === "/book/recommend"
                                    ? <BtnMiniRecommendPressed className={styles.MiniButton}/>
                                    : <BtnMiniRecommend
                                            className={styles.MiniButton}
                                            onClick={() => {
                                                navigate("/book/recommend");
                                            }}/>
                            }
                            {
                                sampleLocation.pathname === "/book/search"
                                    ? <BtnMiniSearchPressed className={styles.MiniButton}/>
                                    : <BtnMiniSearch
                                            className={styles.MiniButton}
                                            onClick={() => {
                                                navigate("/book/search")
                                            }}/>
                            }
                        </Grid>
            }
        </Box>
    );
}

export default Footer;