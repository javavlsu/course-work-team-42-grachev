import React from 'react';
import style from "./AdminProfile.module.scss"
import {dropUser} from "../../../redux/userSlice";
import {useAppDispatch} from "../../../redux/hooks";
import {useNavigate} from "react-router-dom";
import axios from "axios";

type userWithoutRole = {
  login: string;
  registerDate: Date;
};

const AdminProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<userWithoutRole[]>([])

  React.useEffect(() => {
    axios.get(`/api/admin/usersWithoutRole`).then(({data}) => setUsers(data));
  }, [])

  return (
    <div>
      <div className={style.usersList}>
        {users.length !== 0 ? <table className={style.table}>
          <thead>
          <tr>
            <td>Логин</td>
            <td>Дата регистрации</td>
            <td>Роль</td>
            <td>Отправить</td>
          </tr>
          </thead>
          <tbody>
          {users?.map((item, idx) => <tr key={idx + "userKey"} className={style.userItem}>
            <td className={style.userItem__login}>{item.login}</td>
            <td className={style.userItem__regDate}>{item.registerDate.toString()}</td>
            <td>
              <select name={"role" + idx} id={"role" + idx}>
                <option value="user">Пользователь</option>
                <option value="teacher">Учитель</option>
                <option value="student">Студент</option>
              </select>
            </td>
            <td>
              <button onClick={() => {
                axios.post("/api/admin/setUserRole",
                  {
                    login: item.login,
                    // @ts-ignore
                    role: document.getElementById("role" + idx).value
                  })
                setUsers(users?.filter(user => user.login != item.login))
              }
              }>Присвоить
              </button>
            </td>

          </tr>)}
          </tbody>
        </table> : <h2>Нет новых пользователей</h2>}
      </div>
      <button className={style.exitButton} onClick={
        () => {
          dispatch(dropUser());
          navigate("/")
        }
      }>Выйти
      </button>
    </div>
  );
};

export default AdminProfile;