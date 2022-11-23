import React from "react";
import { useStyles } from "../styles";
import { useNavigate } from "react-router-dom";
import BorrowText from '../images/accept+.png'
import CancelText from '../images/Cancle.png'
import { Box, Grid } from "@material-ui/core";

const AcceptBtn = (props) => {
    const styles = useStyles();
    const navigate = useNavigate();
    return (
        <Box >
            <Grid container="container">
                <Grid item="item" sm={12} className={styles.footer}>
                    <img
                        alt="dummy"
                        src={BorrowText}
                        onClick={() => props.setData(true)}
                        className={styles.AcceptButton} />
                    <img
                        alt="dummy"
                        src={CancelText}
                        onClick={() => {
                            navigate("/book/main");
                        }}
                        className={styles.AcceptButton} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AcceptBtn;
