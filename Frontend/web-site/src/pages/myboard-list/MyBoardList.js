import axios from "axios";
import {useEffect, useState} from "react";
import {Link, NavLink, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {jwtUtils} from "../../utils/jwtUtils";
import moment from "moment";

// css
import {Pagination} from "@mui/material";
import {Card} from "../../components/Card";
import "../board-list/boardList.scss";


// 한 페이지당 표시할 수
var totalPost = 8

// 페이지에 맞는 게시글 불러올 함수
const getBoardList = async (token, page, boardType) => {
  const url = "http://i7d211.p.ssafy.io:8081/board/boardAll"
  const id = jwtUtils.getId(token);
  const {data} = await axios.get(`${url}?boardType=${boardType}`);

  var temp = []
  var newData = []

  for (var i=0; i < data.length; i++) {
    if (data[i].id === id) {
      temp.push(data[i]) 
    }
  }

  for (var j = (page-1)*totalPost; j < page*totalPost; j ++) {
    // 총 게시글 수 보다 많아지면 중단
    if (j >= temp.length) {
      break

    } else {
      newData.push(temp[j])
    }
  }

  return newData;
}

const MyBoardList = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [searchParams] = useSearchParams();
  const boardType = searchParams.get("boardType");
  const BT = searchParams.get("BT");
  const token = useSelector(state => state.Auth.token);

  useEffect(() => {
    // 페이지에 해당하는 게시물 가져오기
    getBoardList(token, page, boardType)

    // 현재 페이지에 해당하는 게시물로 상태 변경하기
    .then(result => setBoardList(result));

    // 게시물 전체 갯수 구하기
    const getTotalBoard = async () => {
      const url = "http://i7d211.p.ssafy.io:8081/board/boardAll"
      const id = jwtUtils.getId(token);
      const {data} = await axios.get(`${url}?boardType=${boardType}`);
      
      var newData = []

      for (var i=0; i < data.length; i++) {
        if (data[i].id === id) {
          newData.push(data[i]) 
        }
      }

      return newData.length;
    }

    // 페이지 카운트 구하기
    getTotalBoard().then(result => setPageCount(Math.ceil(result / totalPost)));
      console.log()
  }, [searchParams, token, page, boardType])

  return (
    <div className="boardList-wrapper">
      <div className="menu">
        <NavLink to="/myboard-list?boardType=notice&BT=공지">내 게시물</NavLink>

        <NavLink to="/mybook">대여기록</NavLink>

        <NavLink to="/mypage">회원정보</NavLink>
      </div>
      
      <div className="menu">
        <Link to="/myboard-list?boardType=notice&BT=공지">공지</Link>

        <Link to="/myboard-list?boardType=introduce&BT=소개">소개</Link>

        <Link to="/myboard-list?boardType=suggestion&BT=건의">건의</Link>

        <Link to="/myboard-list?boardType=FAQ&BT=FAQ">FAQ</Link>

        <Link to="/myboard-list?boardType=complaint&BT=불편사항">불편사항</Link>
      </div>

      <div className="boardList-header">
        내가 작성한 {BT} 글
      </div>

      <div className="boardList-body">
        {boardList.map((item, index) => (
          <Card 
            key={item.board_id}
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
        {/*페이지네이션*/}
        <Pagination
          variant="outlined" 
          color="primary" 
          page={Number(page)}
          count={pageCount} 
          size="large"
          onChange={(e, value) => {
            setPage(value)

            getBoardList(token, value)
            .then(result => setBoardList(result));
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  )
}
export default MyBoardList;