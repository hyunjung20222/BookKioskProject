import React, {useState, useEffect, Component} from 'react';
import { useStyles } from "../../styles";
import { Box, Grid } from "@material-ui/core";
import { ReactComponent as MainIcon } from "../../images/Frame 1.svg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CardActionArea, Fade, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function RecommendEmotion(props) {

    const styles = useStyles();
    const navigate = useNavigate();

    return (
        <Fade in={true}>
          <CardActionArea>
            <Box className={styles.center}>
              <Box>
                <Header />
                <Box className={styles.subTitleMessage}>
                  <h1>니 감정입니다 : { props.faces }</h1>
                </Box>
                <Box className={styles.outerWrapperSearch}>
                  <Box className={[styles.main, styles.wrapperSearch]}>
                    {props.faces ? (
                      <Grid container="container">
                        {props.faces.map((face) => (
                          <Grid
                            item="item"
                            xs={6}
                            style={{
                              marginTop: 100,
                              marginBottom: 100,
                            }}
                          >
                            <Box
                              onClick={() => navigate(`/book/detail/${face.isbn}`)}
                            >
                              <img
                                src={face.cover}
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
                                {face.title}
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
