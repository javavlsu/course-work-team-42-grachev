import React from 'react';
import style from "./UserLabel.module.scss";
import PATHS from "../../../../data/paths";
import ProfileIcon from "../../../SvgIcons/ProfileIcon";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../../../redux/hooks";
import axios from "axios";

const UserLabel = () => {
  const user = useAppSelector(state => state.user);
  const [name, setName] = React.useState<string|undefined>();
  const [userStyle, setUserStyle] = React.useState<string>("");

  React.useEffect(()=> {
    if (user.login) axios.get(`/api/student/getname`).then(({data}) => setName(data));
    switch (user.role) {
      case "student":
        setUserStyle(style.student);
        break;
      case "teacher":
        setUserStyle(style.teacher);
        break;
      case "admin":
        setUserStyle(style.admin);
        break;
      default:
        setUserStyle("");
        break;
    }
    if (user.login === undefined && user.role === undefined) setName(undefined)
    else if (name === undefined) setName(user.login)
  }, [user])

  return (
    <>
      {name ?
        <Link to={`${PATHS.PROFILE}/${user.login}`} className={style.user}>
          <ProfileIcon className={style.icon}/>
          <span className={userStyle}>{
            user.role === "admin"
            ? "ADMIN".split("").map((item,idx) => <span key={idx}>{item}</span>)
            : name
          }</span>
        </Link>
        :
        <Link to={PATHS.LOGIN}>
          <ProfileIcon className={style.icon}/>
          <span>Войти</span>
        </Link>
      }


    </>
  );
};

export default UserLabel;