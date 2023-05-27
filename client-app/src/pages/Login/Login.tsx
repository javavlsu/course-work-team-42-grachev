import axios from 'axios';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import style from "./Login.module.scss"
import {useAppDispatch} from "../../redux/hooks";
import {setUser, dropUser} from '../../redux/userSlice';

import crypto from "crypto-js";

type FormRegisterValueType = {
  regLogin: string;
  regEmail: string;
  regPassword: string;
  regName: string;
  regSurname: string;
  regPatronomic: string;
}

type FormLoginValueType = {
  username: string;
  password: string;
}


const Login = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    reset: loginReset,
    setError: loginSetError
  } = useForm<FormLoginValueType>();

  const onLoginSubmit: SubmitHandler<FormLoginValueType> = async (data) => {

    const formData = new FormData()

    formData.append('username', data.username)
    formData.append('password', data.password)

    const response = await axios.post("/api/account/login", formData)
    if (response.status === 400) {
      dispatch(dropUser())
    } else {
      localStorage.setItem("login", data.username);
      document.cookie = `role=${response.data};`
      dispatch(setUser({login: data.username, role: response.data}));
      loginReset();
      navigate("/");
    }
  }

  const {
    register: registerRegister,
    handleSubmit: registerHandleSubmit,
    reset: registerReset,
    setError: registerSetError
  } = useForm<FormRegisterValueType>();

  const onRegisterSubmit: SubmitHandler<FormRegisterValueType> = async (data) => {

    const usersWithLogin = await axios.get("api/account/existslogin", {params: {login: data.regLogin}}).then(({data}) => data)
    const usersWithEmail = await axios.get("api/account/existsemail", {params: {email: data.regEmail}}).then(({data}) => data)

    if (!usersWithEmail || !usersWithLogin) {
      registerSetError("regLogin", {type: "custom", message: "userLogin is using"})
    } else {
      await axios.post("/api/account/register", {
        login: data.regLogin,
        email: data.regEmail,
        password: crypto.SHA1(data.regPassword).toString(),
        name: data.regName,
        surname: data.regSurname,
        patronymic: data.regPatronomic,
      });
      registerReset();
      navigate("/");
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.radioButtons}>
        <input type="radio" name="logReg" id={style.login} defaultChecked={true}/>
        <label htmlFor={style.login}
               id={style.loginLabel}
               onClick={() => {
                 registerReset();
                 loginReset();
               }}>Вход
        </label>
        <input type="radio" name="logReg" id={style.register}/>
        <label htmlFor={style.register}
               id={style.registerLabel}
               onClick={() => {
                 registerReset();
                 loginReset();
               }}>Регистрация
        </label>
      </div>
      <div className={style.loginForm}>
        <form onSubmit={loginHandleSubmit(onLoginSubmit)}>
          <input type="text"
                 className={style.input}
                 {...loginRegister("username", {required: true})}
                 placeholder={"Логин"}
                 autoComplete={"off"}/>
          <input type="password"
                 className={style.input}
                 {...loginRegister("password", {required: true})}
                 placeholder={"Пароль"}
                 autoComplete={"off"}/>
          <button type="submit" className={style.submit}>Войти</button>
        </form>
      </div>
      <div className={style.registerForm}>
        <form onSubmit={registerHandleSubmit(onRegisterSubmit)}>
          <input type="text"
                 className={style.input}
                 {...registerRegister("regLogin", {required: true})}
                 placeholder={"Логин"}
                 autoComplete={"off"}/>
          <input type="email"
                 className={style.input}
                 {...registerRegister("regEmail", {required: true})}
                 placeholder={"Почта"}
                 autoComplete={"off"}/>
          <input type="password"
                 className={style.input}
                 {...registerRegister("regPassword", {required: true})}
                 placeholder={"Пароль"}
                 autoComplete={"off"}/>
          <input type="text"
                 className={style.input}
                 {...registerRegister("regName", {required: true})}
                 placeholder={"Имя"}
                 autoComplete={"off"}/>
          <input type="text"
                 className={style.input}
                 {...registerRegister("regSurname", {required: true})}
                 placeholder={"Фамилия"}
                 autoComplete={"off"}/>
          <input type="text"
                 className={style.input}
                 {...registerRegister("regPatronomic", {required: true})}
                 placeholder={"Отчество"}
                 autoComplete={"off"}/>
          <button type="submit" className={style.submit}>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default Login;