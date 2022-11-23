import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {jwtUtils} from "../../utils/jwtUtils";
import {useSelector} from "react-redux";
import Comments from "../../components/Comments";

// css
import "./board.scss";
import moment from "moment";
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

const Board = () => {
  // URL 파라미터 받기 - board의 id
  const {board_id} = useParams();
  const [board, setBoard] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const token = useSelector(state => state.Auth.token);
  const navigate = useNavigate();

  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);
  
  // board 가져오기
  useEffect(() => {
    const getBoard = async () => {
      const url = "http://i7d211.p.ssafy.io:8081/board/boardDetail"
      const {data} = await axios.get(`${url}?boardId=${board_id}`);
      return data;
    }
    getBoard().then(result => setBoard(result)).then(() => setIsLoaded(true));
  }, [board_id])
  
  return (
    <React.Fragment>
      {isLoaded && (
        <div className="board-wrapper">
          {
            // 해당 글의 작성자가 로그인을 했을 때만 삭제 버튼이 보임
            jwtUtils.isAuth(token) && jwtUtils.getId(token) === board.id &&
            <div className="edit-delete-button">
              <Button
                variant="outlined" 
                color="error" 
                className="delete-button"
                onClick={() => {
                  setShow(true)
                }}
              >
                삭제
              </Button>
              
              {/* <Button
                variant="outlined" 
                onClick={() => {
                  navigate(`/edit-board/${board_id}`)
                }}
              >
                수정
              </Button> */}
            </div>
          }
          <div className="board-header">
            <div className="board-header-username">작성자 :  {board.id}</div>
            <div className="board-header-date">작성일 : {moment(board.created_date).add(9, "hour").format('YYYY-MM-DD')}</div>
          </div>

          <hr/>
          <div className="board-body">
            <div className="board-title-content">
              <div className="board-title">{board.title}</div>
              <div className="board-content">{board.story}</div>
            </div>
          </div>

          <hr/>
          <div className="board-footer">
            <Comments 
               key={board_id}
               board_id={board_id}
            />
          </div>
        </div>
      )}

      {/*modal*/}
      <Dialog open={show}>
        <DialogContent style={{position: "relative"}}>
          <IconButton
            style={{position: "absolute", top: "0", right: "0"}}
            onClick={() => setShow(false)}
          >
            <DisabledByDefaultOutlinedIcon/>
          </IconButton>
          <div className="modal">
            <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
            <div className="modal-button">
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  setShow(false);
                  // 모달의 예 버튼 클릭시 게시물 삭제
                  const config = {
                    headers:{
                      'X-AUTH-TOKEN': token,
                    }
                  }
                  await axios.delete(`/board/board?boardId=${board_id}`, config);
                  alert("게시물이 삭제되었습니다.");
                  navigate("/myboard-list");
                }}
              >
                예
              </Button>

              <Button
                variant="outlined"
                color="primary"
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
    </React.Fragment>
  );
}
export default Board;