import axios from "axios";
import {useDispatch} from "react-redux";
import {setToken} from "../../redux/reducers/AuthReducer";
import {useNavigate, useSearchParams} from "react-router-dom";

// css
import "../sign-up/signUp.scss";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Button, TextField} from "@mui/material";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";


const Login = () => {
  const navigate = useNavigate();

  // 쿼리 파라미터 받아오기
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      //.email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),

    password: Yup.string()
      .required("패스워드를 입력하세요!")
  });

  const submit = async (values) => {
    const {email, password} = values;
    try {
      const {data} = await axios.post("http://i7d211.p.ssafy.io:8081/user/login", 
      {email, password,}
      );
      
      // 로그인 성공시 -> 토큰값 있음
      if (data.token) {
        dispatch(setToken(data.token));

        const redirectUrl = searchParams.get("redirectUrl");

        toast.success(<h3>로그인 성공</h3>, {
          position: "top-center",
          autoClose: 2000
        });
    
        setTimeout(()=> {
          // 로그인을 요구하는 페이지에서 온 경우 돌려보냄
          if (redirectUrl) {
            navigate(redirectUrl);

          } else {
            navigate("/");
          }
        }, 2000);

      } else {
        alert("이메일 혹은 비밀번호가 틀렸습니다.")
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
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({values, handleSubmit, handleChange}) => (
        <div className="signup-wrapper">
          <ToastContainer/>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-forms">
              <div className="input-forms-item">
                <div className="input-label">계정</div>

                <TextField
                  value={values.email}
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                />

                <div className="error-message">
                  <ErrorMessage name="email"/>
                </div>
              </div>

              <div className="input-forms-item">
                <div className="input-label">비밀번호</div>
                <TextField autoComplete="off"
                  value={values.password}
                  name="password"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />

                <div className="error-message">
                  <ErrorMessage name="password"/>
                </div>
              </div>

              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default Login;