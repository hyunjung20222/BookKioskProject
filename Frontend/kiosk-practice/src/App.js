import {ThemeProvider, CssBaseline, Paper} from "@material-ui/core";
import {createTheme} from "@material-ui/core";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {useReducer} from "react";
// book
import Main from "./screens/Book/Main";
import Borrow from "./screens/Book/Borrow";
import Recommend from "./screens/Book/Recommend";
import AgeRecommend from "./screens/Book/RecommendAge";
import RecommendLoginCheck from "./screens/Book/RecommendLoginCheck";
import Return from "./screens/Book/Return";
import Search from "./screens/Book/Search";
import Login from "./screens/Book/Login";
import SearchResult from "./screens/Book/SearchResult";
import Detail from "./screens/Book/Detail";

function App() {
return (
    <BrowserRouter>
        <ThemeProvider>
            <CssBaseline/>
            <Paper>
                <Routes>
                    {/* book */}
                    <Route path="/book/main" element={<Main />} exact="exact"></Route>
                    <Route path="/book/borrow" element={<Borrow />} exact="exact"></Route>
                    <Route path="/book/return" element={<Return />} exact="exact"></Route>
                    <Route path="/book/recommend" element={<Recommend />} exact="exact"></Route>
                    <Route path="/book/recommend/age" element={<AgeRecommend />} exact="exact"></Route>
                    <Route path="/book/recommend/check" element={<RecommendLoginCheck />} exact="exact"></Route>
                    <Route path="/book/search" element={<Search />} exact="exact"></Route>
                    <Route path="/book/searchresult" element={<SearchResult />} exact="exact"></Route>
                    <Route path="/book/login" element={<Login />} exact="exact"></Route>
                    <Route path="/book/detail/:id" element={<Detail />} exact="exact"></Route>
                </Routes>
            </Paper>
        </ThemeProvider>
    </BrowserRouter>
);
}

export default App;
