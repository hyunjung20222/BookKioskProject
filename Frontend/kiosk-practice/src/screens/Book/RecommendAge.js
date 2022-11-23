import React, { useEffect, useState } from "react";
import { useStyles } from "../../styles";
import { Box, CardActionArea, Fade } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BorderColor } from "@material-ui/icons";

export default function RecommendScreen() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [Age, setAge] = useState(0);
  const [Books, setBooks] = useState([]);
  const getBooks = async () => {
    const json = await (
      await fetch(`/book/ageRank`)
    ).json();
    setBooks(json);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Fade in={true}>
      <CardActionArea>
        <Box className={[styles.center]}>
          <Header />
          <Box
            className={styles.subTitleMessage}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {Age === 0 ? (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "#223069",
                  fontSize: 70,
                  color: "white",
                  padding: 20,
                  marginTop: 20,
                  fontWeight: "bold",
                  borderBottom: 0,
                  borderColor: "white",
                  boxShadow: "inset 0px 100px 200px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => {
                  setAge(0);
                }}
              >
                유아
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "navy",
                  fontSize: 70,
                  color: "white",
                  padding: 30,
                  fontWeight: "bold",
                  borderColor: "white",
                }}
                onClick={() => {
                  setAge(0);
                }}
              >
                유아
              </Button>
            )}

            {Age === 10 ? (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "#223069",
                  fontSize: 70,
                  color: "white",
                  padding: 20,
                  marginTop: 20,
                  fontWeight: "bold",
                  borderBottom: 0,
                  borderColor: "white",
                  boxShadow: "inset 0px 100px 200px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => {
                  setAge(10);
                }}
              >
                10대
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "navy",
                  fontSize: 70,
                  color: "white",
                  padding: 30,
                  fontWeight: "bold",
                  borderColor: "white",
                }}
                onClick={() => {
                  setAge(10);
                }}
              >
                10대
              </Button>
            )}

            {Age === 20 ? (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "#223069",
                  fontSize: 70,
                  color: "white",
                  padding: 20,
                  marginTop: 20,
                  fontWeight: "bold",
                  borderBottom: 0,
                  borderColor: "white",
                  boxShadow: "inset 0px 100px 200px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => {
                  setAge(20);
                }}
              >
                20대
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "navy",
                  fontSize: 70,
                  color: "white",
                  padding: 30,
                  fontWeight: "bold",
                  borderColor: "white",
                }}
                onClick={() => {
                  setAge(20);
                }}
              >
                20대
              </Button>
            )}
            {Age === 30 ? (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "#223069",
                  fontSize: 70,
                  color: "white",
                  padding: 20,
                  marginTop: 20,
                  borderBottom: 0,
                  fontWeight: "bold",
                  borderColor: "white",
                  boxShadow: "inset 0px 100px 200px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => {
                  setAge(30);
                }}
              >
                30대
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "navy",
                  fontSize: 70,
                  color: "white",
                  padding: 30,
                  fontWeight: "bold",
                  borderColor: "white",
                }}
                onClick={() => {
                  setAge(30);
                }}
              >
                30대
              </Button>
            )}
            {Age === 40 ? (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "#223069",
                  fontSize: 70,
                  color: "white",
                  padding: 20,
                  marginTop: 20,
                  borderBottom: 0,
                  fontWeight: "bold",
                  borderColor: "white",
                  boxShadow: "inset 0px 100px 200px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => {
                  setAge(40);
                }}
              >
                40대
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "navy",
                  fontSize: 70,
                  color: "white",
                  padding: 30,
                  fontWeight: "bold",
                  borderColor: "white",
                }}
                onClick={() => {
                  setAge(40);
                }}
              >
                40대
              </Button>
            )}
            {Age === 50 ? (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "#223069",
                  fontSize: 70,
                  color: "white",
                  padding: 20,
                  marginTop: 20,
                  borderBottom: 0,
                  fontWeight: "bold",
                  borderColor: "white",
                  boxShadow: "inset 0px 100px 200px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => {
                  setAge(50);
                }}
              >
                50대
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "navy",
                  fontSize: 70,
                  color: "white",
                  padding: 30,
                  fontWeight: "bold",
                  borderColor: "white",
                }}
                onClick={() => {
                  setAge(50);
                }}
              >
                50대
              </Button>
            )}
          </Box>
          <Box className={styles.outerWrapperSearch}>
            <Box style={{ marginTop: -100 }} className={styles.wrapperSearch}>
              {Age === 0 ? (
                Books.zero &&
                Books.zero.map((Book) => (
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
                        marginRight: "auto"
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))
              ) : Age === 10 ? (
                Books.ten &&
                Books.ten.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
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
                        marginRight: "auto"
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))
              ) : Age === 20 ? (
                Books.twenty &&
                Books.twenty.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
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
                        marginRight: "auto"
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))
              ) : Age === 30 ? (
                Books.thirty &&
                Books.thirty.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
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
                        marginRight: "auto"
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))
              ) : Age === 40 ? (
                Books.forty &&
                Books.forty.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
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
                        marginRight: "auto"
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))
              ) : Age === 50 ? (
                Books.fifty &&
                Books.fifty.map((Book) => (
                  <Box
                    onClick={() => {
                      navigate(`/book/detail/${Book.isbn}`);
                    }}
                    style={{
                      display: "flex",
                      border: "0px 2px 2px 2px solid #ffffff",
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
                        marginRight: "auto"
                      }}
                    >
                      {Book.title}
                    </Box>
                  </Box>
                ))
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </CardActionArea>
    </Fade>
  );
}
