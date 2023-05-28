import React from "react";
import Layout from "./component/Layout/Layout";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import PATHS from "./data/paths";
import NotFound from "./pages/NotFound/NotFound";
import ScrollToTop from "./util/ScrollToTop";
import Login from "./pages/Login/Login";
import {dropUser, setUser} from "./redux/userSlice";
import {useAppDispatch} from "./redux/hooks";
import axios from "axios";
import Profile from "./pages/Profile/Profile";
import Course from "./pages/Course/Course";
import Test from "./pages/Test/Test";

function App() {

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const login = localStorage.getItem("login")
    if (login != null) {
      axios.get("/api/account/getrole")
        .then(({data}) => {
          dispatch(setUser({login: login, role: data}))
        })
        .catch(() => {
          dispatch(dropUser());
        })
    }

  }, [])

  return (
    <>
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path={PATHS.MAIN} element={<Layout/>}>
            <Route index element={<Main/>}/>
            <Route path={PATHS.LOGIN} element={<Login/>}/>
            <Route path={PATHS.PROFILE + "/:login"} element={<Profile/>}/>
            <Route path={PATHS.COURSE + "/:id"} element={<Course/>}/>
            <Route path={PATHS.TESTS + "/:testid"} element={<Test/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
