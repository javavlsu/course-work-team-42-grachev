import React from 'react';
import style from "./Profile.module.scss"
import {useAppSelector} from "../../redux/hooks";

import UserProfile from "./UserProfile/UserProfile";
import AdminProfile from "./AdminProfile/AdminProfile";
import {useParams} from "react-router-dom";

const Profile = () => {

  const user = useAppSelector(state => state.user);
  const {login} = useParams();

  return (
    <div className={style.wrapper}>
      {!(user.role === "admin")
        ? <UserProfile user={user}/>
        : login != user.login
          ? <UserProfile user={user}/>
          : <AdminProfile/>
        }
    </div>
  );
};

export default Profile;