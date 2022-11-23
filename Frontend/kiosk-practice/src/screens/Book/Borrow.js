import React, { useState } from "react";

import { CardActionArea, Fade } from "@material-ui/core";

import Borrow1 from "./Borrow1";
import Borrow2 from "./Borrow2";
import Borrow3 from "./Borrow3";
import BorrowLogin from "./BorrowLogin";

export default function ReturnScreen(props) {
    const [brBooks, setBrbooks] = useState([]);
    const [books, setbooks] = useState([]);
    const [Accept, setAccept] = useState(false);

    const [isbn, setIsbn] = useState("");
    const result = brBooks.filter(brBook => brBook.return_check == 0);


    const refreshFunction = (newBook) => {
        setbooks(books.concat(newBook));
        console.log("borrow페이지 리스트", books);
    };

    console.log(Accept);

    return (
        <Fade in={true}>
            <CardActionArea>
                {
                    books.length === 0
                        ? <Borrow1
                            borrowList={books}
                            refreshFunction={refreshFunction}
                            setIsbn={setIsbn} />

                        : result.length !== 0
                            ? <Borrow3 isbn={isbn} borrowList={books} brBooks={result} />
                            : Accept
                                ? <BorrowLogin borrowList={books} setBrbooks={setBrbooks} brBooks={brBooks} />

                                : <Borrow2
                                    setAccept={setAccept}
                                    borrowList={books}
                                    refreshFunction={refreshFunction} />
                }
            </CardActionArea>
        </Fade>

    );
}
