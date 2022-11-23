import {Box, Card, CardActionArea, Fade} from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";

import {useStyles} from "../../styles";
import {ReactComponent as MainIcon} from "../../images/Frame 1.svg";
import {ReactComponent as Signup} from "../../images/Signup.svg";
import {useNavigate} from 'react-router-dom';
import Footer from "../../components/Footer";
import io from "socket.io-client";
import axios from 'axios';
import * as faceApi from "face-api.js";



export default function RecommendScreen(props) {

const styles = useStyles();
const MODEL_URL = process.env.PUBLIC_URL + '/models';

const expressionMap = {
    neutral: "😶",
    happy: "😄",
    sad: "😞",
    angry: "🤬",
    fearful: "😖",
    disgusted: "🤢",
    surprised: "😲"
  };

  const getKeyByValue = (object) => {
    console.log(object)
    const value = [object.angry, 
      object.fearful,
      object.disgusted,  
      object.happy, 
      object.neutral, 
      object.sad, 
      object.surprised]
    const maxValue = Math.max.apply(Math, value)
    console.log(value)
    console.log(maxValue)
    console.log(Object.keys(object))
    const result = Object.keys(object).find(key => object[key] === maxValue)
    console.log(result)
    props.setEmotion(result)
  }


  const video = useRef();

  const [expressions, setExpressions] = useState({})
  const [pulldata, setPulldata] = useState(true)

  useEffect(() => {
    if (pulldata) {
      run()
    }
    else {
      getKeyByValue(expressions)
    }
  })

  const log = (...args) => {
    console.log(...args);
  };

  const run = async () => {
    log("run started");
    try {
      await faceApi.nets.tinyFaceDetector.load(MODEL_URL);
      await faceApi.loadFaceExpressionModel(MODEL_URL);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video
      });

      video.current.srcObject = mediaStream;
    } catch (e) {
      log(e.name, e.message, e.stack);
    }
  };

  const onPlay = async () => {
    if (
      video.current.paused ||
      video.current.ended ||
      !faceApi.nets.tinyFaceDetector.params
    ) {
      setTimeout(() => onPlay());
      return;
    }

    const options = new faceApi.TinyFaceDetectorOptions({
      inputSize: 512,
      scoreThreshold: 0.5
    });

    const result = await faceApi
      .detectSingleFace(video.current, options)
      .withFaceExpressions();

    if (result) {
      log(result);
      setExpressions(result.expressions)
      setPulldata(false)
    }

    setTimeout(() => onPlay(), 1000);
  };

    return (
      <div style={{ backgroundColor: "rgba(15, 29, 160, 0.65)" }}>
<   Box style={{ paddingTop: 500 }} className={styles.TitleMessage}>
        카메라를 바라봐주세요.
      </Box>
        <div>
          {expressions.expressions}
        </div>
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          <video
            ref={video}
            autoPlay
            muted
            onPlay={onPlay}
            style={{
              marginTop: -600,
              position: "absolute",
              width: "100%",
              height: "100vh",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }}
          />
        </div>
      </div>
    );
  }



