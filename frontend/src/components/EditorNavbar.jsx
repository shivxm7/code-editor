import React from 'react'
import logo from '../images/logo.png'
import { FiDownload } from "react-icons/fi";

const EditorNavbar = () => {
  return (
    <>
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414] ">
      <div className="logo">
        <img className='cursor-pointer w-[150px]' src={logo} alt="" />
      </div>
      
      <p>File / <span className='text-[gray]'>My first project</span></p>

      <i className='p-[8px] rounded-[5px] bg-black text-[20px] cursor-pointer hover:text-[#bab6b6]'><FiDownload className='' /></i>
    </div>
    </>
  )
}

export default EditorNavbar