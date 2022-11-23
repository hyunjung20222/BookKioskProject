import { Box, Button, CardActionArea, Fade } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useStyles } from "../../styles";

export default function RecommendResult(props) {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <Fade in={true}>
      <CardActionArea>
        {props.emotion === "sad" ? (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#2B95AC",
            }}
          >
            <Header />
            <Box style={{ marginTop: 80 }} className={styles.TitleMessage}>
              슬픔은 나누면 반이 되잖아요
            </Box>
            <Box className={styles.outerWrapperSearch}>
              <Box style={{ marginTop: 100 }} className={styles.wrapperSearch}>
                {props.BookList.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
                      borderTop: 0,
                    }}
                  >
                    <img
                      src={Book.cover}
                      alt="cover"
                      style={{ margin: 50, width: "250px", height: "350px" }}
                    ></img>
                    <Box
                      style={{
                        display: "flex",
                        color: "white",
                        fontSize: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        ) : props.emotion === "angry" ? (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#E16060",
            }}
          >
            <Header />
            <Box style={{ marginTop: 80 }} className={styles.TitleMessage}>
              만병의 근원, 화
            </Box>
            <Box className={styles.outerWrapperSearch}>
              <Box style={{ marginTop: 100 }} className={styles.wrapperSearch}>
                {props.BookList.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
                      borderTop: 0,
                    }}
                  >
                    <img
                      src={Book.cover}
                      alt="cover"
                      style={{ margin: 50, width: "250px", height: "350px" }}
                    ></img>
                    <Box
                      style={{
                        display: "flex",
                        color: "white",
                        fontSize: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        ) : props.emotion === "disgust" ? (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#313E7E",
            }}
          >
            <Header />
            <Box style={{ marginTop: 80 }} className={styles.TitleMessage}>
              무엇이 힘드셨나요?
            </Box>
            <Box className={styles.outerWrapperSearch}>
              <Box style={{ marginTop: 100 }} className={styles.wrapperSearch}>
                {props.BookList.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
                      borderTop: 0,
                    }}
                  >
                    <img
                      src={Book.cover}
                      alt="cover"
                      style={{ margin: 50, width: "250px", height: "350px" }}
                    ></img>
                    <Box
                      style={{
                        display: "flex",
                        color: "white",
                        fontSize: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        ) : props.emotion === "happy" ? (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#E782E9",
            }}
          >
            <Header />
            <Box style={{ marginTop: 80 }} className={styles.TitleMessage}>
              행복한 순간이야, Happy Day!
            </Box>
            <Box className={styles.outerWrapperSearch}>
              <Box style={{ marginTop: 100 }} className={styles.wrapperSearch}>
                {props.BookList.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
                      borderTop: 0,
                    }}
                  >
                    <img
                      src={Book.cover}
                      alt="cover"
                      style={{ margin: 50, width: "250px", height: "350px" }}
                    ></img>
                    <Box
                      style={{
                        display: "flex",
                        color: "white",
                        fontSize: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        ) : props.emotion === "fear" ? (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#F5FA1D",
            }}
          >
            <Header />
            <Box style={{ marginTop: 80 }} className={styles.TitleMessage}>
              무서워말아요
            </Box>
            <Box className={styles.outerWrapperSearch}>
              <Box style={{ marginTop: 100 }} className={styles.wrapperSearch}>
                {props.BookList.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
                      borderTop: 0,
                    }}
                  >
                    <img
                      src={Book.cover}
                      alt="cover"
                      style={{ margin: 50, width: "250px", height: "350px" }}
                    ></img>
                    <Box
                      style={{
                        display: "flex",
                        color: "white",
                        fontSize: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        ) : props.emotion === "surprise" ? (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#8B57CE",
            }}
          >
            <Header />
            <Box style={{ marginTop: 80 }} className={styles.TitleMessage}>
              당...당황하셨어요?
            </Box>
            <Box className={styles.outerWrapperSearch}>
              <Box style={{ marginTop: 100 }} className={styles.wrapperSearch}>
                {props.BookList.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
                      borderTop: 0,
                    }}
                  >
                    <img
                      src={Book.cover}
                      alt="cover"
                      style={{ margin: 50, width: "250px", height: "350px" }}
                    ></img>
                    <Box
                      style={{
                        display: "flex",
                        color: "white",
                        fontSize: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        ) : props.emotion === "neutral" ? (
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#A6823D",
            }}
          >
            <Header />
            <Box style={{ marginTop: 80 }} className={styles.TitleMessage}>
              미묘하군요..
            </Box>
            <Box className={styles.outerWrapperSearch}>
              <Box style={{ marginTop: 100 }} className={styles.wrapperSearch}>
                {props.BookList.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
                      borderTop: 0,
                    }}
                  >
                    <img
                      src={Book.cover}
                      alt="cover"
                      style={{ margin: 50, width: "250px", height: "350px" }}
                    ></img>
                    <Box
                      style={{
                        display: "flex",
                        color: "white",
                        fontSize: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </CardActionArea>
    </Fade>
  );
}
