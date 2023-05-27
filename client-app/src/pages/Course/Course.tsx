import React from 'react';
import style from "./Course.module.scss"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {useCoursesById} from "../../queries/Courses/coursesQueries";
import PATHS from "../../data/paths";
import clsx from "clsx";

const Course = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const {data: course} = useCoursesById(id as string);

  React.useEffect(() => {
    if (user.login === undefined || user.login === "") navigate("/")
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <h1 className={style.title__title}>{course?.title}</h1>
        <p className={style.title__teacher}>{course?.teacher}</p>
      </div>
      <div className={style.main}>
        <ul className={style.testList}>
          {course?.tests.map((item) =>
            <li className={clsx(style.testItem, "greenCard")}>
              <Link to={`${PATHS.TESTS}/${item.id}`} key={`test${item.id + item.theme}`}>
                {item.theme}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Course;