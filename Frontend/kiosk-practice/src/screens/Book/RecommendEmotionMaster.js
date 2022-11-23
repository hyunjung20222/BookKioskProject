import React, { useState } from "react";
import { useStyles } from "../../styles";
import { Box, CardActionArea, Fade } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import emotions from "../../images/emotions.png";
import agegroup from "../../images/agegroup.png";
import RecommendMain from "./RecommendMain";
import RecommendEmotion from "./RecommendEmotion";
import RecommendScreen from "./RecommendScreen";

import io from "socket.io-client";
import RecommendLoginCheck from "./RecommendLoginCheck";
import RecommendResult from "./RecommendResult";

export default function RecommendEmotionMaster(props) {
  const styles = useStyles();
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState("");
  const [BookList, setBookList] = useState([]);
  return (
    <Fade in={true}>
      <CardActionArea>
        {emotion === "" ? (
          <RecommendScreen setEmotion={setEmotion} />
        ) : BookList.length === 0 ? (
          <RecommendLoginCheck emotion={emotion} BookList={BookList} setBookList={setBookList} />
        ) : (
          <RecommendResult emotion={emotion} BookList={BookList} />
        )}
      </CardActionArea>
    </Fade>
  );
}
