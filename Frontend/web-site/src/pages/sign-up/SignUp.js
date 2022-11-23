import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

// css 영역
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import "./signUp.scss";

const SignUp = () => {
    const navigate = useNavigate();

    const validationSchema = Yup
        .object()
        .shape({
            email: Yup
                .string()
                .email("올바른 이메일 형식이 아닙니다.")
                .required("이메일을 입력하세요."),

            password: Yup
                .string()
                .required("비밀번호를 입력하세요.")
                .matches(
                    /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,16}$/,
                    "비밀번호는 반드시 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다."
                ),

            password2: Yup
                .string()
                .oneOf([
                    Yup.ref("password"), null
                ], "비밀번호가 일치하지 않습니다.")
                .required("필수 입력 값입니다."),

            phonenumber: Yup
                .string()
                .required("전화번호를 입력하세요.")
                .matches(
                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    "전화번호 양식에 맞게 입력해주세요."
                ),

            address: Yup
                .string()
                .required("주소를 입력하세요."),

            name: Yup
                .string()
                .min(2, "이름은 최소 2글자 이상입니다.")
                .max(10, "이름은 최대 10글자입니다.")
                .matches(
                /^[가-힣]{2,4}$/,
                    "이름은 2-4자 사이의 한글로 입력해 주세요."
                )
                .required("이름을 입력하세요."),

            gender: Yup
                .string()
                .oneOf([
                    "0", "1"
                ], "성별은 '남성' 혹은 '여성'으로 입력해야 합니다.")
                .required("성별을 입력하세요."),

            birthday: Yup
                .string()
                .required("생일을 입력하세요.")
                .matches(
                    /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                    "생일 양식(YYYY-MM-DD에 맞게 입력해주세요."
                )
        });

    const submit = async (values) => {
        const {
            email,
            password,
            phonenumber,
            address,
            name,
            gender,
            birthday
        } = values;

        const inputData = {
            email,
            password,
            phonenumber,
            address,
            name,
            gender,
            birthday
        }

        try {
            // console.log(inputData)

            const { data } = await axios.post(
                "http://i7d211.p.ssafy.io:8081/user/signUp",
                inputData
            );

            // 회원가입 성공 -> 데이터 반환값 존재
            if (data.name) {
                toast.success(<h3>회원가입이 완료되었습니다.<br />로그인 하세요.</h3>, {
                    position: "top-center",
                    autoClose: 2000
                });

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }

        } catch (e) {
            // 서버에서 받은 에러 메시지 출력
            console.log(e)
        }
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                phonenumber: "",
                address: "",
                name: "",
                gender: "",
                birthday: ""
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
            validateOnMount={true}>
            {
                ({ values, handleSubmit, handleChange, errors }) => (
                    <div className="signup-wrapper">
                        <ToastContainer />
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="input-forms">

                                <div className="input-forms-item">
                                    <div className="input-label">계정</div>
                                    <TextField
                                        value={values.email}
                                        name="email"
                                        variant="outlined"
                                        onChange={handleChange} />
                                    <div className="error-message">
                                        {errors.email}
                                    </div>
                                </div>

                                <div className="input-forms-item">
                                    <div className="input-label">비밀번호</div>
                                    <TextField
                                        autoComplete="off"
                                        value={values.password}
                                        name="password"
                                        variant="outlined"
                                        type="password"
                                        onChange={handleChange} />
                                    <div className="error-message">
                                        {errors.password}
                                    </div>
                                </div>

                                <div className="input-forms-item">
                                    <div className="input-label">비밀번호 확인</div>
                                    <TextField
                                        autoComplete="off"
                                        value={values.password2}
                                        name="password2"
                                        variant="outlined"
                                        type="password"
                                        onChange={handleChange} />
                                    <div className="error-message">
                                        {errors.password2}
                                    </div>
                                </div>

                                <div className="input-forms-item">
                                    <div className="input-label">전화번호</div>
                                    <TextField
                                        value={values.phonenumber}
                                        name="phonenumber"
                                        variant="outlined"
                                        onChange={handleChange} />
                                    <div className="error-message">
                                        {errors.phonenumber}
                                    </div>
                                </div>

                                <div className="input-forms-item">
                                    <div className="input-label">주소</div>
                                    <TextField
                                        value={values.address}
                                        name="address"
                                        variant="outlined"
                                        onChange={handleChange} />
                                    <div className="error-message">
                                        {errors.address}
                                    </div>
                                </div>

                                <div className="input-forms-item">
                                    <div className="input-label">이름</div>
                                    <TextField
                                        value={values.username}
                                        name="name"
                                        variant="outlined"
                                        onChange={handleChange} />
                                    <div className="error-message">
                                        {errors.name}
                                    </div>
                                </div>

                                <div className="input-forms-item">
                                    <div className="input-label">성별</div>
                                   
                                    <div className="selectBox">
                                        <select name="gender" className="select" onChange={handleChange}>
                                            <option hidden="" disabled="disabled"  selected value="">성별 선택</option>
                                            <option value="0">남</option>
                                            <option value="1">여</option>
                                        </select>
                                    </div>

                                    <div className="error-message">
                                        {errors.gender}
                                    </div>
                                </div>

                                <div className="input-forms-item">
                                    <div className="input-label">생년월일</div>
                                    <TextField
                                        value={values.birthday}
                                        name="birthday"
                                        variant="outlined"
                                        onChange={handleChange}></TextField>
                                    <div className="error-message">
                                        {errors.birthday}
                                    </div>
                                </div>

                                <Button color="primary" variant="contained" fullWidth="fullWidth" type="submit">
                                    회원가입
                                </Button>
                            </div>
                        </form>
                    </div>
                )
            }
        </Formik>
    );
};

export default SignUp;
