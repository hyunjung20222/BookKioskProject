import axios from "axios";
import {useEffect, useState,} from "react";
import {useSearchParams,} from "react-router-dom";

// css
import {Pagination} from "@mui/material";
import {BookCard} from "../../components/BookCard";
import "./bookList.scss";
import "../../components/textArea.scss";

// 한 페이지당 표시할 수
var totalBook = 32

// 페이지에 맞는 게시글 불러올 함수
const getBookList = async (page, keyWord) => {
  const url = "http://i7d211.p.ssafy.io:8081/book/search"
  const {data} = await axios.get(`${url}?keyword=${keyWord}`);

  var newData = []

  for (var i = (page-1)*totalBook; i < page*totalBook; i ++) {
    // 총 책 수 보다 많아지면 중단
    if (i >= data.length) {
      break

    } else {
      newData.push(data[i])
    }
  }
  return newData;
}

const BookList = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [bookList, setBookList] = useState([]);
  const [keyWord, setKeyWord] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 페이지에 해당하는 책 목록 가져오기
    getBookList(page, keyWord)

    // 현재 페이지에 해당하는 게시물로 상태 변경하기
    .then(result => setBookList(result));

    // 게시물 전체 갯수 구하기
    const getTotalBoard = async () => {
      const url = "http://i7d211.p.ssafy.io:8081/book/search"
      const {data} = await axios.get(`${url}?keyword=${keyWord}`);

      return data.length;
    }

    // 페이지 카운트 구하기: (전체 board 갯수) / (한 페이지 갯수) 결과 올림
    getTotalBoard().then(result => setPageCount(Math.ceil(result / totalBook)));
  }, [page, searchParams, keyWord,])

  return (
    <div className="bookList-wrapper">

      <div className="bookList-header">
        도서 검색
      </div>
      
      <input
        onChange={(e) => {
          setKeyWord(e.target.value);
        }}
        className="search"
        placeholder="검색할 도서명을 입력하세요."
        value={keyWord}
      />

      <div className="bookList-body">
        {bookList.map((item, index) => (
          <BookCard
            key ={item.isbn}
            title={item.title}
            cover={item.cover} 
            isbn={item.isbn}
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

            getBookList(value)
            .then(result => setBookList(result));
          }}
          showFirstButton 
          showLastButton
        />
      </div>
    </div>
  )
}
export default BookList;