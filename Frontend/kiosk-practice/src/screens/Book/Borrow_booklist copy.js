import React, {useEffect, useState, useRef} from "react";

import {useStyles} from "../../styles";
import {Box} from "@material-ui/core";
import Borrow_book from "./Borrow_book";

import io from "socket.io-client";

const socket = io.connect("http://localhost:9994");

const Borrow_booklist = () => {
    const styles = useStyles();
    let url;
    let count = 0;

    const [books, setBooks] = useState([]);

    const mounted = useRef(false);

    // test 용 함수
    const sendMsg = (answer) => {
        socket.emit("isbndata", answer);
        url = answer;
    };

    // 소켓에서 입력받은 데이터 값 처리
    const getIsbn = (data) => {
        console.log("getIsbn실행");
        url = data;
        console.log(url);
    }

    // 입력받은 isbn 으로 책 정보 조회


    socket.on('isbnoutput', (data) => {
        getIsbn(data);
        const getBooks = async () => {
            console.log("getBooks실행");
            count = count + 1;
            const json = await(
                await fetch(`http://i7d211.p.ssafy.io:8081/book/detail?ISBN=${url}`)
            ).json();
    
            setBooks((books) => [
                ...books, json
            ]);
            console.log("getBooks (",count,")결과 ", books, json);
        };
        getBooks();
    });

    useEffect(() => {
        console.log("useEffect실행");
        if (!mounted.current) {
            mounted.current = true;
        } else {
        }
    }, []);

    return (
        <Box className={styles.container}>
            <button
                onClick={() => {
                    sendMsg('9791165345990')
                }}/>
            <button
                onClick={() => {
                    sendMsg('9788947286176')
                }}/> {
                books.length === 0
                    ? <Box>Null</Box>
                    : (
                        <Box>
                            {
                                books.map((book) => (
                                    <Borrow_book
                                        ISBN={book.ISBN}
                                        author={book.author}
                                        publish_date={book.publish_date}
                                        cover={book.cover}
                                        title={book.title}
                                        content={book.content}
                                        genre={book.genre}/>
                                ))
                            }
                        </Box>
                    )
            }
        </Box>
    );
}

export default Borrow_booklist;