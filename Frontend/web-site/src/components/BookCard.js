import "./bookCard.scss";
import {useNavigate} from "react-router-dom";

export const BookCard = ({isbn, title, cover}) => {
  const navigate = useNavigate();

  return (
    <div className="book-cards-wrapper" onClick={() => {
      navigate(`/book/${isbn}`)
    }}>
      <div className="book-card-body-img">
        <img src={cover} alt="이미지 없음"/>
      </div>
      
      <div className="book-card-footer">
        <div className="card-body-text-title">{title}</div>
      </div>
    </div>
  );
};