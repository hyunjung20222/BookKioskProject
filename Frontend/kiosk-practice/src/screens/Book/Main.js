import {Box, Card, CardActionArea} from "@material-ui/core";
import React from "react";

import {useStyles} from "../../styles";
import {ReactComponent as MainIcon} from "../../images/Frame 1.svg";
import {ReactComponent as Signup} from "../../images/Signup.svg";
import {useNavigate} from 'react-router-dom';
import Footer from "../../components/Footer";

export default function HomeScreen(props) {
    const styles = useStyles();
    const navigate = useNavigate();

    const logout = async () => {

    };

    return (
        <Card>
            <CardActionArea>
                <Box className={[styles.center]}>
                    <MainIcon className={styles.largeLogo}/>
                    <Box>
                        <Signup
                            className={styles.SignupButton}
                            onClick={() => navigate("/book/Login")}/>
                        <Footer/>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
}
