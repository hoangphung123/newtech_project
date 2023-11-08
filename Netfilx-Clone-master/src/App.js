import "./App.css"
import HomePage from "./home/HomePage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SinglePage from "./components/watch/SinglePage"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Login from "./login/Login"
import Register from "./register/Register"
import Profile from "./profile/profile"
import { useDispatch } from "react-redux"
import { Fragment, useEffect, useState } from "react"
import jwtDecode from "jwt-decode"
import * as UserService from './services/userStore'
import { updateUser } from './redux/slides/userSlide'
import AdminPage from "./admin/AdminPage/AdminPage"
import Loading from "./components/LoadingComponent/Loading"
import DefaultComponent from "./components/DefaultComponent/DefaultComponent"



function App() {
  const dispatch = useDispatch();
  const [showFooter, setShowFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleDecoded = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let decoded = {};

    if (user) {
      decoded = jwtDecode(user.access_token);
    }

    return { decoded, accessToken: user ? user.access_token : null };
  };

  useEffect(() => {
    const { decoded, accessToken } = handleDecoded();

    if (decoded?.id) {
      handleGetDetailUsers(decoded.id, accessToken);
    }
  }, []);

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date();
    const { decoded } = handleDecoded();
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('refreshToken', refreshToken);

    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken(refreshToken);
      config.headers['token'] = `Bearer ${data?.access_token}`;
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  });



  const handleGetDetailUsers = async (id, token) => {
    try {
      const res = await UserService.getDetailUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
      console.log('res', res);
    } catch (error) {
      // Handle error when getting user details
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} >
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/Register' component={Register} />
            <Route path='/system/admin' render={(props) => <AdminPage {...props} isPrivate={true} showFooter={showFooter} />} />
            <Route>
              <Header />
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/profile' component={Profile} />
                <Route path='/singlepage/:id' component={SinglePage} exact />
              </Switch>
              {showFooter && <Footer />}
            </Route>
          </Switch>
        </Router>
      </Loading>
    </>
  )
}

export default App
