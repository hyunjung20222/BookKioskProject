import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useStyles } from "../../styles";
import BookItem from "./Borrow_book"
import axios from 'axios';

export default function RentalSTatus() {
    const styles = useStyles();

    const [Books, setBooks] = useState([]);
    const [chats, setchats] = useState([]);

    const bookIsbns = ['9788968506598', '9788968506581'];

    async function getBook(bookdata) {
        console.log(bookdata)
        axios
            .get("http://i7d211.p.ssafy.io:8081/book/detail", {
                params: {
                    ISBN: bookdata
                }
            })
            .then(function (response) {
                console.log("Here get Book", response.data);
                setBooks([response.data, ...Books]);
                console.log("Here get Book", response.data);
                console.log("Here get Books", Books);
            })
    }

    console.log("Hello");

    async function BookList() {
        bookIsbns.map((bookIsbn) => {
            console.log(bookIsbn);
            getBook(bookIsbn);
        });
    }
    useEffect(async () => { BookList(); }, []);

    return (
        // 여기다 박스 만들어줘야할거같은데용.....
        <Box className={[styles.outerWrapper]}>
            <Box className={[styles.wrapper]}>
                {/* {
                    Books.map((Book) => {
                        return (
                            <Book
                                key={Book.title}
                                title={Book.title}
                                author={Book.author}
                                publish_date={Book.publish_date}
                                content={Book.content}
                                cover={Book.cover} />
                        );
                    })
                } */}
            </Box>
        </Box>
    );
}