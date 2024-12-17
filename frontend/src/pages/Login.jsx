import React, { useState } from "react";
import logo from "../images/logo.png";
import image from "../images/authPageSide.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const submitForm = () => {
    e.preventDefault();
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
                type="text"
                placeholder="Password"
              />
            </div>

            <p className="text-[gray]">
              Dont have an account{" "}
              <Link to="/Signup" className="text-[#00AEEF]">
                Sign Up
              </Link>{" "}
            </p>

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
