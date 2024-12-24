import React, { useState } from "react";
import logo from "../images/logo.png";
import image from "../images/authPageSide.png";
import { Link, useNavigate } from "react-router-dom";
import { api_based_url } from "../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_based_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          setTimeout(() => {
            window.location.href = "/";
          }, 200);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => console.error("Request error:", err));
  };
  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[40%]">
          <img className="w-[200px]" src={logo} alt="" />
          <form onSubmit={submitForm} className="w-full mt-[60px]" action="">
            <div className="inputbox">
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="text"
                placeholder="Email"
              />
            </div>

            <div className="inputbox">
              <input
                required
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
                type="password"
                placeholder="Password"
              />
            </div>

            <p className="text-[gray]">
              Dont have an account{" "}
              <Link to="/Signup" className="text-[#00AEEF]">
                Sign Up
              </Link>{" "}
            </p>

            <p className="text-red-500 text-[14px] my-2">{error}</p>

            <button className="btnBlue w-full mt-[20px]">Login</button>
          </form>
        </div>
        <div className="right w-[55%]">
          <img className="h-[100vh] w-[100%] object-cover" src={image} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
