import React, { Component, useState, useEffect } from "react";

import { useStyles } from "../../styles";
import { Box, Grid } from "@material-ui/core";
import Footer from "../../components/Footer";
import ReturnText from '../../images/Return.png'
import CancelText from '../../images/Cancle.png'
import { useNavigate } from "react-router-dom";

import { ReactComponent as Plus } from "../../images/plusBtn.svg";
import io from "socket.io-client";
import axios from 'axios';

const Return2 = (props) => {
    const styles = useStyles();
    const navigate = useNavigate();
    console.log(props.rbook)

    const [sockets, setSockets] = useState([]);
    const [data, setData] = useState(false);
    const [state, setState] = useState(false);

    console.log(data);
    const socket = io.connect("http://localhost:9994");

    const getBook = (bookdata) => {
        setState(false)
        console.log(bookdata)
        axios
            .get("/book/detail", {
                params: {
                    ISBN: bookdata
                }
            })
            .then(function (response) {
                props.setRbook(props.rbook.concat(response.data));
            })
    }

    const getReturn = (isbn) => {
        console.log(isbn)
        axios
            .put("/book/return", {}, {
                params: {
                    ISBN: isbn
                }
            })
            .then(function (response) {
                console.log(response.data)

            })
    }

    const getReturnFinal = (isbn) => {
        console.log(isbn)
        axios
            .put("/book/return", {}, {
                params: {
                    ISBN: isbn
                }
            })
            .then(function (response) {
                console.log(response.data)
                props.setAccept(false)
            })
    }

    const Return = () => {
        for (let i = 0; i < props.rbook.length; i++) {
            console.log(props.rbook[i].isbn)
            if (i == props.rbook.length - 1) {
                getReturnFinal(props.rbook[i].isbn)
            } else {
                getReturn(props.rbook[i].isbn)
            }
        }
    }

    const otherbook = () => {
        setSockets('connect')

        setState(true)
        socket.emit("inputdata", 0);
    }

    useEffect(() => {
        socket.on('isbnoutput', (data) => {
            console.log(data)
            getBook(data)
        })

        return () => {
            socket.close()
        }
    }, [socket]);

    const todayTime = () => {
        let now = new Date();
        let todayMonth = now.getMonth() + 1;
        let todayDate = now.getDate();
        const week = [
            '일',
            '월',
            '화',
            '수',
            '목',
            '금',
            '토'
        ];
        let dayOfWeek = week[now.getDay()];
        return todayMonth + "월" + todayDate + "일 " + dayOfWeek + "요일";
    }

    return (
        <Box className={styles.center}>
            <Box
                className={[styles.Bigcard]}
                style={{
                    paddingTop: 50
                }}>
                <Box className={[styles.BigcardInner]}>
                    {
                        state
                            ? <Box className={[styles.Card]}>
                                <Box>
                                    책을 올려주세요
                                </Box>
                                <Plus
                                    onClick={() => {
                                        getBook('9791165345990')
                                    }} />
                            </Box>
                            : <Box className={[styles.Card]}>
                                <img
                                    src={props
                                        .rbook[props.rbook.length - 1]
                                        .cover}
                                    style={{
                                        width: "600px",
                                        height: "750px",
                                        boxShadow: "20px 60px 40px rgba(0, 0, 0, 0.25)",
                                        margin: 50
                                    }}
                                    alt="dummy"></img>
                                {
                                    <Box>{
                                        props
                                            .rbook[props.rbook.length - 1]
                                            .title
                                    }</Box>
                                }
                                {
                                    <Box
                                        style={{
                                            margin: 50
                                        }}>{
                                            props
                                                .rbook[props.rbook.length - 1]
                                                .author
                                        }</Box>
                                }
                                <Plus
                                    onClick={() => {
                                        otherbook()
                                    }} />
                            </Box>
                    }
                    <Box
                        className={[styles.TitleMessage]}
                        style={{
                            marginTop: 50
                        }}>
                        {todayTime().slice(0, 9)}
                        <br></br>
                        반납합니다
                    </Box>
                </Box>
            </Box>

            <Grid container="container">
                <Grid item="item" sm={12} className={styles.footer}>
                    <img
                        alt="dummy"
                        src={ReturnText}
                        onClick={() => Return(true)}
                        className={styles.AcceptButton} />
                    <img
                        alt="dummy"
                        src={CancelText}
                        onClick={() => {
                            navigate("/book/main");
                        }}
                        className={styles.AcceptButton} />
                </Grid>
            </Grid>

            <Footer />
        </Box>
    );
}

export default Return2;
