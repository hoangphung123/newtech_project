import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as UserService from '../services/userStore'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../redux/slides/userSlide'


const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const user  = useSelector((state) => state.user)
  

  const handleLogin = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await login(email, password);
      console.log('reponse',response)
      if (response.data.status === "ERR") {
        setError(response.data.message);
        setSuccess("");
        toast.error(response.data.message); // Display error message with react-toastify
      } else {
        setSuccess("Đăng nhập thành công!");
        setError("");
        toast.success("Đăng nhập thành công"); // Display success message with react-toastify
        handleGetDetailUsers(user.id, response.data.access_token);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      setError("Lỗi đăng ký: " + error.message);
      setSuccess("");
      toast.error("Lỗi đăng ký: " + error.message); // Display error message with react-toastify
    }
  };

  const handleGetDetailUsers = async (id, token) => {
    const res = await UserService.getDetailUser(id,token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
    console.log('res',res)
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>TIBOX</h1>
          <p>Our redundances other necessaries.</p>
          <span>Don't you have an account?</span>
          <Link to="/Register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
