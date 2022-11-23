import { Box } from "@mui/system";
import React from "react";
import { useStyles } from "../../styles";
import propTypes from "prop-types"

function Book({ publish_date, title, author, content, cover }) {
    const styles = useStyles();

    return (
        <div className="movie_list">
            <div className="movie_poster">
                <img src="{cover}" alt="{title}" />
            </div>
            <h3 className="movie_title">{title}</h3>
            <h5 className="movie_year">{author}</h5>
            <h5 className="movie_year">{publish_date}</h5>
            <p className="movie_summary">{content}</p>
        </div>
    );
}

Book.propTypes = {
    publish_date: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
    cover: propTypes.string.isRequired
}

export default Book;
