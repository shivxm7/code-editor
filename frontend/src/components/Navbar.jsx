import React from 'react'
import logo from '../images/logo.png'
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar';
import { MdOutlineLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { toggleClass } from '../helper';

const Navbar = () => {
  return (
    <>
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414] ">
      <div className="logo">
        <img className='cursor-pointer w-[150px]' src={logo} alt="" />
      </div>
      <div className="links flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/services">Services</Link>
        <Avatar onClick={() => {toggleClass(".dropDownNavBar", "hidden")}} name="Wim Mostmans" size="40" textSizeRatio={1.75} className='rounded-full cursor-pointer ml-2' />
      </div>

      <div className="dropDownNavBar hidden absolute right-[30px] top-[80px] shadow-lg rounded-md shadow-black/50 p-[10px] bg-[#1A1919] w-[150px] h-[140px]">
        <div className='py-[10px] border-b-[1px] border-b-[#fff]'>
          <h3 className='text-[17px]' style={{lineHeight:1}}>Shivam Sehgal</h3>
        </div>
        <i className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{fontStyle:"normal"}}>
          <MdOutlineLightMode className='text-[20px]'/> Light mode
        </i>

        <i className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{fontStyle:"normal"}}>
          <BsGridFill className='text-[20px]'/> Grid layout
        </i>
      </div>
    </div>
    </>
  )
}

export default Navbar