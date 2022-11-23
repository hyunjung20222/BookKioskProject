import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useSearchParams,} from "react-router-dom";
import {jwtUtils} from "../../utils/jwtUtils";
import {useSelector} from "react-redux";

// css
import {Pagination} from "@mui/material";
import {Card} from "../../components/Card";
import "./boardList.scss";
import moment from "moment";


// 한 페이지당 표시할 수
var totalPost = 8

// 페이지에 맞는 게시글 불러올 함수
const getBoardList = async (page, boardType) => {
  const url = "http://i7d211.p.ssafy.io:8081/board/boardAll"
  const {data} = await axios.get(`${url}?boardType=${boardType}`);

  var newData = []

  for (var i = (page-1)*totalPost; i < page*totalPost; i ++) {
    // 총 게시글 수 보다 많아지면 중단
    if (i >= data.length) {
      break

    } else {
      newData.push(data[i])
    }
  }
  return newData;
}

const BoardList = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [BT, setBT] = useState("");

  const [searchParams] = useSearchParams();
  const boardType = searchParams.get("boardType");
  const [isAuth, setIsAuth] = useState(false);
  const token = useSelector(state => state.Auth.token);
  const board_url = `/add-board?boardType=${boardType}&BT=${BT}`

  useEffect(() => {
    // 로그인 유무
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);

    } else {
      setIsAuth(false);
    }

    if (boardType === "notice") {
      setBT("공지");

    }else if (boardType === "introduce") {
      setBT("소개");

    }else if (boardType === "suggestion") {
      setBT("건의");

    }else if (boardType === "FAQ") {
      setBT("FAQ");

    }else if (boardType === "complaint") {
      setBT("불편사항");
    }

    // 페이지에 해당하는 게시물 가져오기
    getBoardList(page, boardType)

    // 현재 페이지에 해당하는 게시물로 상태 변경하기
    .then(result => setBoardList(result));

    // 게시물 전체 갯수 구하기
    const getTotalBoard = async () => {
      const url = "http://i7d211.p.ssafy.io:8081/board/boardAll"
      const {data} = await axios.get(`${url}?boardType=${boardType}`);

      return data.length;
    }

    // 페이지 카운트 구하기: (전체 board 갯수) / (한 페이지 갯수) 결과 올림
    getTotalBoard().then(result => setPageCount(Math.ceil(result / totalPost)));
  }, [page, searchParams, boardType, token])

  return (
    <div className="boardList-wrapper">
      <div className="menu">
        <Link to="/board-list?boardType=notice">공지</Link>

        <Link to="/board-list?boardType=introduce">소개</Link>

        <Link to="/board-list?boardType=suggestion">건의</Link>

        <Link to="/board-list?boardType=FAQ">FAQ</Link>

        <Link to="/board-list?boardType=complaint">불편사항</Link>
        
        {isAuth ? (
          <>
            <Link to={board_url}>새글 작성</Link>
          </>
        ) : (
          <>
          </>
        )}
      </div>

      <div className="boardList-header">
        {BT} 게시판
      </div>

      <div className="boardList-body">
        {boardList.map((item, index) => (
          <Card 
            key ={item.board_id}
            board_id={item.board_id}
            id={item.id} 
            date={moment(item.created_date).add(9, "hour").format('YYYY-MM-DD')}
            title={item.title} 
            content={item.story}
            answers={item.answers}
          />
        ))}
      </div>

      <div className="boardList-footer">
        {/* pagination : count에 페이지 카운트, page에 페이지 번호 넣기 */}
        <Pagination
          variant="outlined" 
          color="primary" 
          page={Number(page)}
          count={pageCount} 
          size="large"
          onChange={(e, value) => {
            setPage(value)

            getBoardList(value)
            .then(result => setBoardList(result));
          }}
          showFirstButton 
          showLastButton
        />
      </div>
    </div>
  )
}
export default BoardList;