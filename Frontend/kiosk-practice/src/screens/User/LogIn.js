import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from "react-router-dom";
import React, { useState, createContext } from "react";
// import axios from 'axios';

function Login() {
  const UserContext = createContext(null);
  const history = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitAccount = async () => {
    try {
      const user = await fetchLogin(account);

      //성공시 user 아이디 패스워드값 셋팅
      UserContext(user);

      //성공시 url로 이동
      history.replace("/");

    } catch (error) {

      //실패시
      window.alert(error);
    }
  };

  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          maxWidth: 400,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
      >
        <div>
          <Typography level="h4" component="h1">
            <b>환영합니다!</b>
          </Typography>

          <Typography level="body2">로그인</Typography>
        </div>

        <TextField
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          label="계정"
          onChange={onChangeAccount}
        />

        <TextField
          id="password"
          name="password"
          type="password"
          placeholder="password"
          label="비밀번호"
          onChange={onChangeAccount}
        />

        <Button onClick={onSubmitAccount}
          sx={{
            mt: 1, // margin top
          }}
        >
          로그인
        </Button>

        <Typography
          endDecorator={<Link href="/user/signup">회원 가입</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          계정이 없으신가요?
        </Typography>
        
      </Sheet>
    </CssVarsProvider>
  );
}

export default Login;

export const fetchLogin = async ({ email, password }) => {
  const response = await fetch("http://localhost:8888/users");

  if (response.ok) {
    const users = await response.json();

    const user = users.find((user) => user.email === email);

    //일치하는 user가 없거나, 비밀번호가 틀리면 해당 에러 생성
    if (!user || user.password !== password) {
      throw new Error("계정 또는 비밀번호가 일치하지 않습니다.");
    }

    //모든게 일치하면 그 user 정보 return
    return user;
  }

  //서버 통신이 안이루어졌을떄
  throw new Error("서버 통신이 원할하지 않습니다.");
};