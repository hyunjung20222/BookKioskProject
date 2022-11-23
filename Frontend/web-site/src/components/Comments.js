import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import {useLocation, useNavigate} from "react-router-dom";

// css
import {Button, Dialog, DialogContent, IconButton, TextField, Pagination} from "@mui/material";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import moment from 'moment';
import "./comments.scss";


// 한페이지에 보일 댓글 수
var totalComment = 5

// 페이지별 댓글
const getCommentList = async (board_id, page) => {
  const url = "http://i7d211.p.ssafy.io:8081/board/boardDetail"
  const {data} = await axios.get(`${url}?boardId=${board_id}`);

  var newData = []

  for (var i = (page-1)*totalComment; i < page*totalComment; i ++) {
    // 총 댓글 수 보다 많아지면 중단
    if (i >= data.answers.length) {
      break

    } else {
      newData.push(data.answers[i])
    }
  }
  return newData;
}

const Comments = ({board_id}) => {
  // 로그인 후 현재 경로로 돌아오기 위해 useLocation 사용
  const location = useLocation();
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);

  // 입력한 댓글 내용
  const [content, setContent] = useState("");
  const token = useSelector(state => state.Auth.token);

  // 현재 페이지, 전체 페이지 갯수
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);

  // 페이지에 해당하는 댓글 목록은 page 상태가 변경될 때마다 가져옴
  // 맨 처음 페이지가 1이므로 처음엔 1페이지에 해당하는 댓글을 가져온다
  useEffect(() => {
    getCommentList(board_id, page)

    // 현재 페이지에 맞게 변경
    .then((result) => setCommentList(result));

    // 댓글 전체 갯수 구하기
    const getTotalComment = async () => {
      const url = "http://i7d211.p.ssafy.io:8081/board/boardDetail"
      const {data} = await axios.get(`${url}?boardId=${board_id}`);

      return data.answers.length;
    }

    // 페이지 카운트 구하기: (전체 comment 갯수) / (한 페이지 갯수) 결과 올림
    getTotalComment().then((result) => setPageCount(Math.ceil(result / totalComment)));
  }, [board_id, page, commentList])

  // 댓글 추가하기
  const submit = useCallback(async () => {
    const comment = {
      "id": jwtUtils.getId(token),
      "board_id" : board_id,
      "story": content,
    }

    const config = {
      headers:{
        'X-AUTH-TOKEN': token,
      }
    }

    // 로그인해야 사용가능
    const {data} = await axios.put("/board/boardAnswer", 
      comment, config
      );

      if (data === "success") {
        window.alert("등록이 완료되었습니다.");
        
        navigate(`/board/${board_id}`);
      }
  }, [board_id, content, token, navigate]);

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
    <div className="comments-wrapper">
      <div className="comments-header">
        <TextField
          className="comments-header-textarea"
          maxRows={3}
          onClick={isLogin}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          multiline placeholder="댓글을 입력해주세요."
        />
        {content !== "" ? (
          <Button variant="outlined" onClick={submit}>등록</Button>
        ) : (
          <Button variant="outlined" disabled={true}>
            등록
          </Button>
        )}
      </div>

      <div className="comments-body">
        {commentList.map((item, index) => (
          <div key={index} className="comments-comment">
            <div className="comment-username-date">
              <div className="comment-date">작성일 : {moment(item.created_date).add(9, "hour").format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className="comment-content">내용 : {item.story}</div>
            <div className="comment-username">작성자 : {item.id}</div>
            <hr/>
          </div>
        ))}
      </div>
      {

      
      <div className="comments-footer">
        <Pagination
          variant="outlined" 
          color="primary" 
          page={Number(page)}
          count={pageCount} 
          size="large"
          onChange={(e, value) => {
            setPage(value)

            getCommentList(board_id, value)
            .then(result => setCommentList(result));
          }}
          showFirstButton 
          showLastButton
        />
      </div>
        
      }

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

export default Comments;