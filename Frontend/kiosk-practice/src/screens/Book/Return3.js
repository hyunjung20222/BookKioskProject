import React, { Component, useEffect } from "react";
import { useState } from "react";
import { useStyles } from "../../styles";
import { Box } from "@material-ui/core";
import Footer from "../../components/Footer";
import Timer from './Timer';

import axios from 'axios';

const Return3 = (props) => {
    const styles = useStyles();
    const [books, setBooks] = useState([]);
    const [Dbooks, setDBooks] = useState([]);

    const [page, setPage] = useState(1);

    const nextPage = () => {
        console.log(page)
        if (page >= props.brBooks.length) {
            setPage(1)
        } else {
            setPage(page + 1)
        }
    }

    const SeeME = () => {
        console.log(props.brBooks)
    }

    const getBorrow = (isbn) => {
        console.log(isbn)

        axios
            .put("/book/return", {}, {
                params: {
                    ISBN: isbn
                }
            })
            .then(function (response) {
                setBooks(response.data)
                getBook(response.data)
            })
    }
    console.log(props.brBooks)
    const getBook = (data) => {
        data.map((BOOK) => (console.log(BOOK.isbn), axios.get("/book/detail", {
            params: {
                ISBN: BOOK.isbn
            }
        }).then(function (response) {
            setDBooks(Dbooks.concat(response.data));
        })))
    }

    useEffect(() => {
        console.log(props.isbn)
    }, []);

    return (
        <Box className={styles.center}>
            <Box
                className={[styles.Bigcard]}
                style={{
                    paddingTop: 50
                }}>
                <Box
                    className={[styles.BigcardInner]}
                    onClick={() => {
                        nextPage()
                    }}>
                    <Box
                        className={[styles.TitleMessage]}
                        style={{
                            margin: 50
                        }}>
                        대여&nbsp;현황
                    </Box>

                    {
                        <Box className={[styles.Card]}>
                            <Box>{page}/{props.brBooks.length}</Box>
                            <img
                                src={props
                                    .brBooks[page - 1]
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
                                        .brBooks[page - 1]
                                        .title
                                }</Box>
                            }

                        </Box>
                    }

                    <Box
                        className={[styles.TitleMessage]}
                        style={{
                            margin: 50
                        }}>
                        반납이&nbsp;완료되었습니다<br></br>
                        감사합니다
                    </Box>
                </Box>
            </Box>
            <Box onClick={() => {
                SeeME()
            }}></Box>
            <Box>
                {Dbooks.map((book) => (<div>{book.title}</div>))}
            </Box>
            <Box className={[styles.TitleMessage]}></Box>

            <Timer sec="10" />
            <meta http-equiv="refresh" content="10; url=http://localhost:3000/book/main" />

            <Footer />
        </Box>
    );
}
export default Return3;
