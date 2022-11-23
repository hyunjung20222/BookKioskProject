import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import {useLocation, useNavigate} from "react-router-dom";

// css
import "./reviews.scss";
import moment from 'moment';
import {Button, Dialog, DialogContent, IconButton, Pagination} from "@mui/material";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";



// 한페이지에 보일 리뷰 수
var totalReviews = 5

// 페이지별 댓글
const getReviewList = async (isbn, page) => {
  const url = "http://i7d211.p.ssafy.io:8081/book/detail"
  const {data} = await axios.get(`${url}?ISBN=${isbn}`);

  var newData = []

  for (var i = (page-1)*totalReviews; i < page*totalReviews; i ++) {
    // 총 댓글 수 보다 많아지면 중단
    if (i >= data.reviews.length) {
      break

    } else {
      newData.push(data.reviews[i])
    }
  }
  return newData;
}

const Reviews = ({isbn}) => {
  // 로그인 후 현재 경로로 돌아오기 위해 useLocation 사용
  const location = useLocation();
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);

  // 입력한 리뷰 내용
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [star, setStar] = useState("");
  const token = useSelector(state => state.Auth.token);

  // 현재 페이지, 전체 페이지 갯수
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);

  // 페이지에 해당하는 댓글 목록은 page 상태가 변경될 때마다 가져옴
  // 맨 처음 페이지가 1이므로 처음엔 1페이지에 해당하는 댓글을 가져온다
  useEffect(() => {
    getReviewList(isbn, page)

    // 현재 페이지에 맞게 변경
    .then((result) => setReviewList(result));

    // 댓글 전체 갯수 구하기
    const getTotalReviews = async () => {
      const url = "http://i7d211.p.ssafy.io:8081/book/detail"
      const {data} = await axios.get(`${url}?ISBN=${isbn}`);

      return data.reviews.length;
    }

    // 페이지 카운트 구하기: (전체 comment 갯수) / (한 페이지 갯수) 결과 올림
    getTotalReviews().then((result) => setPageCount(Math.ceil(result / totalReviews)));
  }, [isbn, page, reviewList])

  // 리뷰 추가하기
  const submit = useCallback(async () => {
    const review = {
      "isbn" : isbn,
      "title" : title,
      "story" : content,
      "star" : star,
    }

    const config = {
      headers:{
        'X-AUTH-TOKEN': token,
      }
    }

    // 로그인해야 사용가능
    const {data} = await axios.put("/book/review", 
      review, config
      );

      if (data === "success") {
        window.alert("등록이 완료되었습니다.");
        
        navigate(`/book/${isbn}`);
      }
  }, [isbn, title, content, star, token, navigate]);

  /* modal  */
  // 로그인 후 돌아올 수 있게 현재 경로 세팅
  const goLogin = () => {
    setShow(false);
    navigate(`/login?redirectUrl=${location.pathname}`);
  }

  // 로그인을 하지 않은 상태에서 댓글 입력 창을 클릭하면 Modal이 열림.
  const isLogin = () => {
    if (!jwtUtils.isAuth(token)) {
      setShow(true);
    }
  }

  return (
    <div className="reviews-wrapper">
      <div className="header">리뷰 목록</div>
      <hr/>
      <div className="reviews-body">
        {reviewList.map((item, index) => (
          <div key={index} className="reviews-review">
            <div className="review-username-date">
              <div className="review-username">작성자 : {item.id}</div>
              <div className="comment-date">작성일 : {moment(item.created_date).add(9, "hour").format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className="review-content">제목 : {item.title}</div>
            <div className="review-content">내용 : {item.story}</div>
            <div className="review-content">평점 : {item.star}</div>
            
            <hr/>
          </div>
        ))}
      </div>

      {
      <div className="reviews-footer">
        <Pagination
          variant="outlined" 
          color="primary" 
          page={Number(page)}
          count={pageCount} 
          size="large"
          onChange={(e, value) => {
            setPage(value)

            getReviewList(isbn, value)
            .then(result => setReviewList(result));
          }}
          showFirstButton 
          showLastButton
        />
      </div>     
      }
      
      <hr/>
      <div className="header">리뷰 작성</div>
      <hr/>
      <div className="reviews-header">
        <input
          className="title"
          onClick={isLogin}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          placeholder="제목을 입력하세요."
        />

        <textarea
          className="content"
          onClick={isLogin}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          placeholder="리뷰 내용을 입력해주세요."
        />
        
        <select name="selectStar" id="star" onChange={(e) => {
            setStar(e.target.value)
          }}> 
          <option hidden="" disabled="disabled"  selected value="">==평점==</option>

          <option value="0">0</option>
      
          <option value="1">1</option>
       
          <option value="2">2</option>
     
          <option value="3">3</option>
  
          <option value="4">4</option>
    
          <option value="5">5</option>
        </select>

        {title !== "" & content !== "" & star !== ""? (
          <Button variant="outlined" onClick={submit}>등록</Button>
        ) : (
          <Button variant="outlined" disabled={true}>등록</Button>
        )}
      </div>


      {/* modal */}
      <Dialog open={show}>
        <DialogContent style={{position: "relative"}}>
          <IconButton
            style={{position: "absolute", top: "0", right: "0"}}
            onClick={() => {
              setShow(false)
            }}
          >
            <DisabledByDefaultOutlinedIcon/>
          </IconButton>
          <div className="modal">
            <div className="modal-title">로그인이 필요합니다.</div>
            <div className="modal-content">로그인 페이지로 이동하시겠습니까?</div>
            <br/>
            <div className="modal-button">
              <Button
                variant="outlined" color="error"
                onClick={goLogin}
              >
                예
              </Button>
              
              <Button
                variant="outlined" color="primary"
                onClick={() => {
                  setShow(false)
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Reviews;