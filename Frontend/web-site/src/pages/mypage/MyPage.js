import axios from "axios";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

// css
import "./myPage.scss";

const MyPage = () => {
    const token = useSelector(state => state.Auth.token);
    const [userProfile, setUserProfile] = useState([]);
    // const [userImage, setUserImage] = useState([]);

    useEffect(() => {
        // 유저 프로필 불러오기
        const getUserProfile = async () => {
            const config = {
                headers: {
                    'X-AUTH-TOKEN': token
                }
            }

            const {data} = await axios.get("/user/profileInfo", config);

            return data;
        }

        getUserProfile().then(result => setUserProfile(result));

        // 유저 프로필 사진 불러오기
        // const getUserImage = async () => {
        //     const config = {
        //         headers: {
        //             'X-AUTH-TOKEN': token
        //         }
        //     }

        //     const {data} = await axios.get("/user/image", config);

        //     return data;
        // }
        // getUserImage().then(result => setUserImage(result));
    }, [token]);

    return (
        <div className="mypage-wrapper">
            <div className="menu">
                <NavLink to="/myboard-list?boardType=notice&BT=공지">내 게시물</NavLink>
                <NavLink to="/mybook">대여기록</NavLink>
                <NavLink to="/mypage">회원 정보</NavLink>
            </div>

            {/* <div className="user-image">
                {userImage}
            </div> */}

            <div style={{
                    padding: "5rem"
                }}></div>
                
            <div className="mypage-contents">
                <div>계정 : {userProfile.email}
                </div>
                <div>이름 : {userProfile.name}
                </div>
                <div>연락처 : {userProfile.phonenumber}
                </div>
                <div>주소 : {userProfile.address}
                </div>

                {
                    userProfile.gender
                        ? (<div>성별 : 남성</div>)
                        : (<div>성별 : 여성</div>)
                }

                <div>생일 : {userProfile.birthday}
                </div>
            </div>

        </div>
    );
};

export default MyPage;