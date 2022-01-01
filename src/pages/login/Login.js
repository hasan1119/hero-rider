import React from "react";
import "./../../assets/css/login.css";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import avatar from "./../../assets/images/avater.png";
import { Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth.js";
const Login = () => {
  const { signInWithEmail, loading, email } = useAuth();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const location = useLocation();
  const redirect = location?.state?.from || "/";
  const onSubmit = (data) => {
    signInWithEmail({ ...data, history, redirect });
  };
  if (email) {
    return <>{history.replace("/")}</>;
  } else {
    return (
      <div className="login-page">
        <div
          style={{ height: "100vh" }}
          className="d-flex mx-3 align-items-center justify-content-center"
        >
          <div className="formContainer">
            <div className="text-center">
              <img width="120px" src={avatar} alt="" />
            </div>
            <h2 className="text-center text-white">Please Login</h2>
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="form-control"
                type="email"
                required
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              <input
                required
                type="password"
                className="form-control"
                {...register("password", { required: true })}
                placeholder="Enter your password"
              />
              <button className="btn register-btn" type="submit">
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
