import React from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import AddBoard from "./pages/add-board/AddBoard";
import BoardList from "./pages/board-list/BoardList";
import MyBoardList from "./pages/myboard-list/MyBoardList";
import Board from "./pages/board/Board";
import MyPage from "./pages/mypage/MyPage";
import MyBook from "./pages/mypage/MyBook";
import SearchBook from "./pages/search-book/SearchBook";
import BookDetail from "./pages/search-book/BookDetail"
//import EditBoard from "./pages/edit-board/EditBoard";


const App = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <Header/>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home/>}/>

        {/* 회원가입 */}
        <Route path="/sign-up" element={<SignUp/>}/>

        {/* 로그인 */}
        <Route path="/login" element={<Login/>}/>

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage/>}/>

        {/* 대여기록 */}
        <Route path="/mybook" element={<MyBook/>}/>

        {/* 새글 작성 */}
        <Route
          path="/add-board"
          element={
            <PrivateRoute path="/add-board" component={AddBoard}/>
          }
        />

        {/* 글 목록 */}
        <Route path="/board-list" element={<BoardList/>}/>
        
        {/* 내가 작성한 글 */}
        <Route
          path="/myboard-list"
          element={
            // 쿼리 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
            <PrivateRoute path={`${location.pathname}`} component={MyBoardList}/>
          }
        />
        
        {/* 글 상세 페이지 */}
        <Route path="/board/:board_id" element={<Board/>}/>
              
        {/* 도서 검색 페이지 */}
        <Route path="/search-book" element={<SearchBook/>}/>

        {/* 도서상세 페이지 */}
        <Route path="/book/:isbn" element={<BookDetail/>}/>

        {/* 글 수정 */}
        {/* <Route
          path="/edit-board/:board_id"
          element={
            // URI 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
            <PrivateRoute path={`${location.pathname}`} component={EditBoard}/>
          }
        /> */}
      </Routes>
    </React.Fragment>
  )
}
export default App;