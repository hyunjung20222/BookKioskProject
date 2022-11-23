import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {jwtUtils} from "../../utils/jwtUtils";

// css
import TextArea from "../../components/TextArea";
import {Button} from "@mui/material";
import "../add-board/addBoard.scss";

const EditBoard = () => {
  const token = useSelector(state => state.Auth.token);
  const navigate = useNavigate();

  // URI 파라미터 가져오기
  const {board_id} = useParams();

  // 게시판 제목, 내용
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getBoard = async () => {
      const url = "http://i7d211.p.ssafy.io:8081/board/boardDetail"
      const {data} = await axios.get(`${url}?boardId=${board_id}`);
      return data;
    }
    getBoard().then((result) => {
      setTitle(result.title);
      setContent(result.content);
    });
  }, [board_id])

  const canSubmit = useCallback(() => {
    return content !== "" && title !== "";
  }, [title, content]);

  const handleSubmit = useCallback(async () => {
    const inputData = {
      "id" : jwtUtils.getId(token),
      "title" : title, 
      "story" : content,
      "type" : "notice",
    }

    const config = {
      headers:{
        'X-AUTH-TOKEN': token,
      }
    }

    try {
      const {data} = await axios.put("/board/board", 
      inputData, config
      );

      if (data === "success") {
        window.alert("등록이 완료되었습니다.");
        navigate(`/board/${board_id}`);
      }

    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      console.log(e)
    }

  }, [board_id, content, navigate, title, token]);

  return (
    <div className="addBoard-wrapper">
      <div className="addBoard-header">
        게시물 수정하기
      </div>
      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            수정하기
          </Button>
        ) : (
          <Button
            className="disable-button"
            variant="outlined"
            size="large"
          >
            제목과 내용을 모두 입력하세요.
          </Button>
        )}
      </div>
      <div className="addBoard-body">
        <TextArea 
          setTitle={setTitle} 
          setContent={setContent} 
          title={title} 
          content={content}/>
      </div>
    </div>
  );
}

export default EditBoard;