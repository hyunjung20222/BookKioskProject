import React from "react";
import { useState } from "react";
import { useStyles } from "../../styles";
import { Box } from "@material-ui/core";
import Footer from "../../components/Footer";
import Timer from './Timer';

const Return4 = (props) => {
    const styles = useStyles();

    const [page, setPage] = useState(1);

    const nextPage = () => {
        console.log(page)
        if (page >= props.brBooks.length) {
            setPage(1)
        } else {
            setPage(page + 1)
        }
    }

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
                        이미&nbsp;반납된 책 입니다<br></br>
                        감사합니다
                    </Box>
                </Box>
            </Box>
            <Box className={[styles.TitleMessage]}></Box>

            <Timer sec="10" />
            <meta http-equiv="refresh" content="10; url=http://localhost:3000/book/main" />

            <Footer />
        </Box>
    );
}
export default Return4;
