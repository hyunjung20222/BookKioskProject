import "./header.scss";
import {Link, useNavigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {jwtUtils} from "../utils/jwtUtils";
import {useEffect, useState} from "react";
import {setToken} from "../redux/reducers/AuthReducer";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.Auth.token);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (jwtUtils.isAuth(token)) {
            setIsAuth(true);

        } else {
            setIsAuth(false);
        }
    }, [token]);

    const logout = async () => {
        await dispatch(setToken(""));
        alert("로그아웃 되었습니다.");
        navigate("/");
    };


    return (
        <div className="header-wrapper">
            <div className="header-title">
                <Link to="/">
                    <div className="header-icon"/>
                    <span>&nbsp;&nbsp;<i>BOOK극성</i>
                    </span>
                </Link>
            </div>

            <div className="header-menu">
                <NavLink to="/board-list?boardType=notice" >게시판</NavLink>
                <NavLink to="/search-book">도서 검색</NavLink>

                {/* 로그인 유무 판단*/}
                {
                    isAuth
                        ? <> <NavLink to = "/mypage" activeStyle= {{color: "red"}} > 회원정보</NavLink> < Link to = "#" onClick = {
                            logout
                        } > 로그아웃</Link> </>
                        : (
                            <>
                                <NavLink to="/login" >로그인</NavLink>
                                < NavLink to = "/sign-up" > 회원가입</NavLink> </>
                        )
                }
            </div>

        </div>
    );
};

export default Header;