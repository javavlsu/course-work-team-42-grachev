import React from 'react';
import style from "./AdminProfile.module.scss"
import {dropUser} from "../../../redux/userSlice";
import {useAppDispatch} from "../../../redux/hooks";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AccountGrid} from "./components";

type userWithoutRole = {
  login: string;
  registerDate: Date;
};

const AdminProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const exit = () => {
    dispatch(dropUser());
    navigate("/")
  }

  return (
    <div>
      <button className={style.exitButton} onClick={exit}>Выйти</button>
      <AccountGrid/>
    </div>
  );
};

export default AdminProfile;