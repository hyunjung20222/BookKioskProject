import React, { useState, useEffect, useCallback, Component } from 'react';
import { useStyles } from "../../styles";
import { Box, Grid } from "@material-ui/core";

import { ReactComponent as MainIcon } from "../../images/Frame 1.svg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import io from "socket.io-client";
import axios from 'axios';

const Borrow1 = (props) => {
    const styles = useStyles();
    const [books, setBooks] = useState([]);

    const socket = io.connect("http://localhost:9994");

    const getBook = (bookdata) => {
        console.log(bookdata)
        axios
            .get("/book/detail", {
                params: {
                    ISBN: bookdata
                }
            })
            .then(function (response) {
                setBooks(response.data)
                props.refreshFunction(response.data);
                props.setIsbn(bookdata)
                console.log(books)
                console.log(props.borrowList)
                return books
            })
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

    return (
        <Box className={styles.center}>
            <Header />
            <Box style={{ padding: 140 }}></Box>
            <MainIcon
                className={styles.largeLogo}
                onClick={() => {
                    getBook('9771228773007')
                }} />
            <Box className={[styles.TitleMessage, styles.padding]}>책을 올려주세요</Box>
            <Footer />
        </Box>
    );
}

export default Borrow1;