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
import RecommendAge from "./RecommendAge";

import io from "socket.io-client";
import RecommendLoginCheck from "./RecommendLoginCheck";
import RecommendEmotionMaster from "./RecommendEmotionMaster";

export default function Recommend() {
  const styles = useStyles();
  const navigate = useNavigate();

  const [emotion, setEmotion] = useState("sad");
  const [faces, setFaces] = useState([]);
  const [screen, setScreen] = useState(0);

  return (
    <Fade in={true}>
      <CardActionArea>
        {screen === 0 ? (
          <RecommendMain setScreen={setScreen} />
        ) : screen === 1 ? (
          <RecommendEmotionMaster />
        ) : (
          <RecommendAge />
        )}
      </CardActionArea>
    </Fade>
  );
}
