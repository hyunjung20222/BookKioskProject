import axios from "axios";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {NavLink, useSearchParams} from "react-router-dom";

// css
import {Pagination} from "@mui/material";
import {Card} from "./Book";
import "./myBook.scss";
import moment from 'moment';


// 한 페이지당 표시할 수
var totalBook = 8

// 페이지에 맞게 불러올 함수
const getBookList = async (token, page) => {
  const config = {
    headers:{
      'X-AUTH-TOKEN': token,
    }
  }

  const {data} = await axios.get("/user/profileUsage", 
  config
  );
  
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

const MyBook = () => {
  const token = useSelector(state => state.Auth.token);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [bookList, setBookList] = useState([]);
  const [searchParams] = useSearchParams();
  

  useEffect(() => {
    // 대여기록 불러오기
    getBookList(token, page)
    .then(result => setBookList(result));

    // 책 전체 갯수 구하기
    const getTotalBook = async () => {
      const config = {
        headers:{
          'X-AUTH-TOKEN': token,
        }
      }
    
      const {data} = await axios.get("/user/profileUsage", 
      config
      );

      return data.length;
    }

    // 페이지 카운트 구하기: (전체 책 갯수) / (한 페이지 갯수) 결과 올림
    getTotalBook().then(result => setPageCount(Math.ceil(result / totalBook)));

  }, [token, page, searchParams]);
  
  return (
    <div className="bookList-wrapper">
            <div className="menu">
                <NavLink to="/myboard-list?boardType=notice&BT=공지">내 게시물</NavLink>
                <NavLink to="/mybook">대여기록</NavLink>
                <NavLink to="/mypage">회원 정보</NavLink>
            </div>

      <div className="bookList-body">
        {bookList.map((item, index) => (
          <Card 
            key ={item.isbn}
            isbn={item.isbn}
            rental_date={moment(item.rental_date).add(9, "hour").format('YYYY-MM-DD')}
            return_date={moment(item.return_date).add(9, "hour").format('YYYY-MM-DD')}
            return_check={item.return_check} 
            title={item.book.title}
            cover={item.book.cover}
          />
        ))}
      </div>
      
      <div className="bookList-footer">
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
  );
};

export default MyBook;