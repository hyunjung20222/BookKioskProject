import "./home.scss";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="background">
            <div className="home-wrapper">
                <div className="home-titles">
                    <br/>
                    <span>독서가를 위한 길잡이 북극성</span>
                </div>

                <div className="home-contents">
                    <div>읽었던, 읽고 있던, 읽고 싶던</div>
                    <div>한 곳에서 모든 책을</div>
                    <div>Book극성이</div>
                    <div>독서를 편하게 해드리겠습니다.</div>
                </div>

                <Link to = "/sign-up" className="home-about" >
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시작하기</span>
                </Link>
            </div>
        </div>
    )
}
export default Home;