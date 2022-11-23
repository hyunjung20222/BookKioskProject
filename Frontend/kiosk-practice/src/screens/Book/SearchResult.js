import { CardActionArea, Fade, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useStyles } from "../../styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default function SearchResult() {
  const { state } = useLocation();
  const styles = useStyles();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    const json = await (
      await fetch(
        `http://i7d211.p.ssafy.io:8081/book/search?keyword=${state.keyword}`
      )
    ).json();
    setBooks(json);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Fade in={true}>
      <CardActionArea>
        <Box className={styles.center}>
          <Box>
            <Header />
            <Box className={styles.subTitleMessage}>
              "{state.keyword}"의 검색결과입니다.
            </Box>
            <Box className={styles.outerWrapperSearch}>
              <Box className={[styles.main, styles.wrapperSearch]}>
                {books ? (
                  <Grid container="container">
                    {books.map((book) => (
                      <Grid
                        item="item"
                        xs={6}
                        style={{
                          marginTop: 100,
                          marginBottom: 100,
                        }}
                      >
                        <Box
                          onClick={() => navigate(`/book/detail/${book.isbn}`)}
                        >
                          <img
                            src={book.cover}
                            style={{
                              width: "400px",
                              height: "500px",
                            }}
                            alt="dummy"
                          ></img>
                          <Typography
                            noWrap="noWrap"
                            style={{
                              marginTop: 10,
                            }}
                            component="h3"
                            variant="h3"
                          >
                            {book.title}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  "표시할 책 내용이 없습니다."
                )}
              </Box>
            </Box>
            <Footer />
          </Box>
        </Box>
      </CardActionArea>
    </Fade>
  );
}
