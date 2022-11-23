import { useState, useEffect, useCallback } from 'react';

import React, { Component } from "react";
import { useStyles } from "../../styles";
import { Box, Grid } from "@material-ui/core";
import Footer from "../../components/Footer";
import AcceptBtn from "../../components/AcceptBtn";

import { ReactComponent as Plus } from "../../images/plusBtn.svg";

import io from "socket.io-client";
import axios from 'axios';

const Borrow2 = (props) => {
    const styles = useStyles();
    const [sockets, setSockets] = useState([]);
    const [data, setData] = useState(false);
    const [state, setState] = useState(false);

    props.setAccept(data);

    console.log(data);

    const socket = io.connect("http://localhost:9994");

    const getBook = (bookdata) => {
        console.log(bookdata)
        setState(false)
        axios
            .get("/book/detail", {
                params: {
                    ISBN: bookdata
                }
            })
            .then(function (response) {
                props.refreshFunction(response.data);

            })
    }

    const otherbook = () => {
        setSockets('connect')
        setState(true)
        socket.emit("inputdata", 1);
    }

    useEffect(() => {
        socket.on('isbnoutput', (data) => {
            console.log(data)
            getBook(data)
        })
        return () => {
            socket.close()
        }
    }, [sockets]);


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

    const weeksAfterdayTime = () => {
        let now = new Date();
        let weeksAfter = new Date(now.setDate(now.getDate() + 14));
        let todayMonth = weeksAfter.getMonth() + 1;
        let todayDate = weeksAfter.getDate();
        const week = [
            '일',
            '월',
            '화',
            '수',
            '목',
            '금',
            '토'
        ];
        let dayOfWeek = week[weeksAfter.getDay()];

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
                                        .borrowList[props.borrowList.length - 1]
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
                                            .borrowList[props.borrowList.length - 1]
                                            .title
                                    }</Box>
                                }
                                {
                                    <Box
                                        style={{
                                            margin: 50
                                        }}>{
                                            props
                                                .borrowList[props.borrowList.length - 1]
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
                        {weeksAfterdayTime().slice(0, 9)}
                        까지<br></br>
                        대여합니다
                    </Box>
                </Box>

            </Box>

            <AcceptBtn setData={setData} />

            <Footer />
        </Box>
    );
}

export default Borrow2;