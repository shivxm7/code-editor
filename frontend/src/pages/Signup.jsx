import React, { useState } from 'react'
import logo from "../images/logo.png"
import image from "../images/authPageSide.png"
import { Link } from 'react-router-dom'

const Signup = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const submitForm = () => {
        e.preventDefault();
    }
  return (
    <>
    <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[40%]">
            <img className='w-[200px]' src={logo} alt="" />
            <form onSubmit={submitForm} className='w-full mt-[60px]' action="">
                <div className="inputbox">
                    <input required onChange={(e) => {setUsername(e.target.value)}} value={username} type="text" placeholder='Username' />
                </div>

                <div className="inputbox">
                    <input required onChange={(e) => {setName(e.target.value)}} value={name}type="text" placeholder='Name' />
                </div>

                <div className="inputbox">
                    <input required onChange={(e) => {setEmail(e.target.value)}} value={email} type="text" placeholder='Email' />
                </div>

                <div className="inputbox">
                    <input required onChange={(e) => {setPwd(e.target.value)}} value={pwd} type="text" placeholder='Password' />
                </div>

                <p className='text-[gray]'>Already have an account <Link to="/Login" className="text-[#00AEEF]">login</Link> </p>

                <button className='btnBlue w-full mt-[20px]'>Sign Up</button>
            </form>
        </div>
        <div className="right w-[55%]">
            <img className='h-[100vh] w-[100%] object-cover' src={image} alt="" />
        </div>
    </div>
    </>
  )
}

export default Signup