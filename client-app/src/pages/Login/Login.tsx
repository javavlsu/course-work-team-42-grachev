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
  logLogin: string;
  logPassword: string;
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
    const accountRole = await axios.post("/api/account/login", {
      logLogin: data.logLogin,
      logPassword: crypto.SHA1(data.logPassword).toString()
    }).then(({data}) => data);
    if (accountRole === "err") dispatch(dropUser())
    else {
      localStorage.setItem("login", data.logLogin);
      document.cookie = `role=${accountRole};`
      dispatch(setUser({login: data.logLogin, role: accountRole}));
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
        regLogin: data.regLogin,
        regEmail: data.regEmail,
        regPassword: crypto.SHA1(data.regPassword).toString(),
        regName: data.regName,
        regSurname: data.regSurname,
        regPatronomic: data.regPatronomic,
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
                 {...loginRegister("logLogin", {required: true})}
                 placeholder={"Логин"}
                 autoComplete={"off"}/>
          <input type="password"
                 className={style.input}
                 {...loginRegister("logPassword", {required: true})}
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