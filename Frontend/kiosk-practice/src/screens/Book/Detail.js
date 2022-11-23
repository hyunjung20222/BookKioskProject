import { Button, CardActionArea, Fade, Modal, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { ReactComponent as ShowReview } from "../../images/리뷰 보기.svg";
import { ReactComponent as BookLocation } from "../../images/책의 위치.svg";
import { ReactComponent as Reservation } from "../../images/대여 예약.svg";
import { ReactComponent as BorrowStatus } from "../../images/대여 현황.svg";
import { ReactComponent as RelatedBooks } from "../../images/연관 도서.svg";
import { ReactComponent as Star0 } from "../../images/star0_day.svg";
import { ReactComponent as Star05 } from "../../images/star0.5_day.svg";
import { ReactComponent as Star1 } from "../../images/star1_day.svg";
import { ReactComponent as Star15 } from "../../images/star1.5_day.svg";
import { ReactComponent as Star2 } from "../../images/star2_day.svg";
import { ReactComponent as Star25 } from "../../images/star2.5_day.svg";
import { ReactComponent as Star3 } from "../../images/star3_day.svg";
import { ReactComponent as Star35 } from "../../images/star3.5_day.svg";
import { ReactComponent as Star4 } from "../../images/star4_day.svg";
import { ReactComponent as Star45 } from "../../images/star4.5_day.svg";
import { ReactComponent as Star5 } from "../../images/star5_day.svg";
import { ReactComponent as Location } from "../../images/Location.svg";
import { ReactComponent as DetailedLocation } from "../../images/DetailedLocation.svg";
import { useStyles } from "../../styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
export default function Detail() {
  const navigate = useNavigate();
  const styles = useStyles();
  const url = window.location.pathname;
  const regex = /[0-9]/g; //숫자만 추출
  const [loading, setLoading] = useState(true);
  const [onReview, setReview] = useState(false);
  const [onLocation, setLocation] = useState(false);
  const [onDetailedLocation, setDetailedLocation] = useState(false);
  const [lookReview, setLookReview] = useState(false);
  const [onReservation, setReservation] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [reviewStory, setReviewStory] = useState();
  const [book, setBook] = useState([]);

  const getBook = async () => {
    const json = await (
      await fetch(
        `http://i7d211.p.ssafy.io:8081/book/detail?ISBN=${url
          .match(regex)
          .join("")}`
      )
    ).json();
    setBook(json);
    setLoading(false); //로딩풀기
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div>
      <Fade in={true}>
        <CardActionArea>
          {loading ? (
            <Box
              style={{
                width: 1440,
                height: 2560,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(15, 29, 160, 0.65)",
              }}
            >
              <strong className={[styles.main, styles.center]}>
                <h2>Loading...</h2>
              </strong>
            </Box>
          ) : (
            <Box className={[styles.center]}>
              <Header />
              <Box container className={styles.detailUpper}>
                <Box>
                  <img
                    style={{ width: "430px", height: "660px" }}
                    src={book.cover}
                    alt="cover"
                  ></img>
                  <Typography
                    style={{ color: "#FFCB45", fontSize: 70, marginTop: 50 }}
                  >
                    {book.star === 5 ? (
                      <Star5 className={styles.star} />
                    ) : book.star >= 4.5 ? (
                      <Star45 className={styles.star} />
                    ) : book.star >= 4 ? (
                      <Star4 className={styles.star} />
                    ) : book.star >= 3.5 ? (
                      <Star35 className={styles.star} />
                    ) : book.star >= 3 ? (
                      <Star3 className={styles.star} />
                    ) : book.star >= 2.5 ? (
                      <Star25 className={styles.star} />
                    ) : book.star >= 2 ? (
                      <Star2 className={styles.star} />
                    ) : book.star >= 1.5 ? (
                      <Star15 className={styles.star} />
                    ) : book.star >= 1 ? (
                      <Star1 className={styles.star} />
                    ) : book.star >= 0.5 ? (
                      <Star05 className={styles.star} />
                    ) : (
                      <Star0 className={styles.star} />
                    )}{" "}
                    {book.reviews && book.reviews.length > 0
                      ? Math.round(book.star * 10) / 10
                      : "0.0"}
                  </Typography>
                </Box>

                <Box>
                  <Box style={{ marginTop: 100, overflow: "auto" }}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: 50,
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 50,
                          fontWeight: "bold",
                          color: "white",
                          marginTop: -150,
                          marginBottom: 50,
                          position: "fixed",
                        }}
                      >
                        {book.title}
                      </Typography>
                    </Box>
                    <Typography
                      component="h3"
                      variant="h3"
                      style={{
                        color: "#ffffff",
                        marginLeft: 40,
                        height: 450,
                        marginTop: 20,
                      }}
                    >
                      {onReview
                        ? book.reviews.length > 0
                          ? book.reviews &&
                            book.reviews.map((review) => (
                              <Box>
                                <Box>
                                  <TableContainer>
                                    <Table>
                                      <TableBody>
                                        <TableRow key={review.review_id}>
                                          <TableCell>
                                            <Typography
                                              style={{
                                                fontSize: 40,
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                color: "#ffffff",
                                              }}
                                            >
                                              {review.id}
                                            </Typography>
                                            <Box>
                                              {review.star === 5 ? (
                                                <Star5 />
                                              ) : review.star === 4.5 ? (
                                                <Star45 />
                                              ) : review.star === 4 ? (
                                                <Star4 />
                                              ) : review.star === 3.5 ? (
                                                <Star35 />
                                              ) : review.star === 3 ? (
                                                <Star3 />
                                              ) : review.star === 2.5 ? (
                                                <Star25 />
                                              ) : review.star === 2 ? (
                                                <Star2 />
                                              ) : review.star === 1.5 ? (
                                                <Star15 />
                                              ) : review.star === 1 ? (
                                                <Star1 />
                                              ) : review.star === 0.5 ? (
                                                <Star05 />
                                              ) : (
                                                <Star0 />
                                              )}
                                            </Box>
                                          </TableCell>
                                          <TableCell>
                                            <Typography
                                              onClick={() => {
                                                setLookReview(!lookReview);
                                                setSelectedIndex(
                                                  review.review_id
                                                );
                                                setReviewStory(review.story);
                                              }}
                                              style={{
                                                fontSize: 40,
                                                color: "#ffffff",
                                              }}
                                            >
                                              {review.title}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography
                                              style={{
                                                fontSize: 40,
                                                color: "#ffffff",
                                              }}
                                            >
                                              {review.created_date.slice(0, 10)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                                <Box>
                                  {lookReview &&
                                  selectedIndex === review.review_id ? (
                                    <Box
                                      style={{
                                        width: "100%",
                                        border: "2px solid #000",
                                        boxShadow: 24,
                                      }}
                                    >
                                      <Typography style={{ fontSize: 40 }}>
                                        {reviewStory}
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <></>
                                  )}
                                </Box>
                              </Box>
                            ))
                          : "등록된 리뷰가 없습니다."
                        : book.content
                        ? book.content.slice(0, 140) + "..."
                        : "표시할 책 내용이 없습니다."}
                    </Typography>
                  </Box>

                  <Box
                    style={{ marginLeft: 30, marginTop: 70, marginBottom: 30 }}
                  >
                    <ShowReview
                      onClick={() => {
                        setReview(!onReview);
                      }}
                      className={styles.detailUpperButton}
                    />
                    <BookLocation
                      onClick={() => {
                        setLocation(true);
                      }}
                      className={styles.detailUpperButton}
                    />
                    <Modal
                      open={onLocation}
                      onClose={() => {
                        setLocation(false);
                        setDetailedLocation(false);
                      }}
                    >
                      <Box className={styles.modal}>
                        {onDetailedLocation ? (
                          <DetailedLocation
                            onClick={() => setDetailedLocation(false)}
                          />
                        ) : (
                          <Location onClick={() => setDetailedLocation(true)} />
                        )}
                      </Box>
                    </Modal>
                    <Reservation
                      onClick={() => {
                        fetch("URL").then((response) => response.json());
                        setReservation(true);
                      }}
                      className={styles.detailUpperButton}
                    />
                    <Modal
                      open={onReservation}
                      onClose={() => {
                        setReservation(false);
                      }}
                    >
                      <Box
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "#ffffff",
                          width: 1000,
                          height: 500,
                          border: "2px solid #000",
                          boxShadow: 24,
                        }}
                      >
                        <Typography
                          style={{
                            marginTop: 100,
                            fontSize: 50,
                            marginLeft: 180,
                          }}
                        >
                          대여 예약이 완료 되었습니다.
                        </Typography>

                        <Button
                          variant="contained"
                          sx={{
                            fontSize: 50,
                            marginLeft: 55,
                            marginTop: 25,
                            alignItems: "flex-end",
                            justifyContent: "center",
                          }}
                          onClick={() => setReservation(false)}
                        >
                          닫기
                        </Button>
                      </Box>
                    </Modal>
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  marginTop: -250,
                  marginRight: 50,
                  marginBottom: 100,
                }}
              >
                <BorrowStatus style={{ alignItems: "center" }} />
                <img
                  className={styles.detailBorrowStatus}
                  src={book.cover}
                  style={{ width: 125, height: 200 }}
                  alt="dummy"
                ></img>
                <img
                  className={styles.detailBorrowStatus}
                  style={{ width: 125, height: 200 }}
                  src={book.cover}
                  alt="dummy"
                ></img>
                <img
                  className={styles.detailBorrowStatus}
                  src={book.cover}
                  style={{ width: 125, height: 200 }}
                  alt="dummy"
                ></img>
                <img
                  className={styles.detailBorrowStatus}
                  src={book.cover}
                  style={{ width: 125, height: 200 }}
                  alt="dummy"
                ></img>
              </Box>
              <Box className={styles.RelatedBooks}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    marginTop: -50,
                  }}
                >
                  <RelatedBooks />
                </Box>
                <Box className={styles.horizontalScroll}>
                  {book.related_books &&
                    book.related_books.map((related_book) => (
                      <div
                        onClick={() => {
                          navigate(`/book/detail/${related_book.isbn}`);
                          navigate(0);
                        }}
                      >
                        <img
                          width={350}
                          height={500}
                          className={styles.RelatedBookList}
                          src={related_book.cover}
                          alt="related"
                        />
                      </div>
                    ))}
                </Box>
              </Box>
              <Footer />
            </Box>
          )}
        </CardActionArea>
      </Fade>
    </div>
  );
}
