import React, { useState } from 'react'
import EditorNavbar from '../components/EditorNavbar'
import Editor from '@monaco-editor/react';
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";

const EditorApp = () => {
  const [islightMode, setIsLightMode] = useState(false);

  const changeTheme = () =>{
    if(islightMode){
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    }
    else{
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  }
  return (
    <>
        <EditorNavbar/>

        <div className="flex">
            <div className="left w-[50%]">
                <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
                  <div className='flex items-center gap-2'>
                    <div className='tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] rounded-md'>index.html</div>
                    <div className='tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] rounded-md'>style.css</div>
                    <div className='tab p-[6px] bg-[#1E1E1E] px-[10px] text-[15px] rounded-md'>script.js</div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <i className='features text-[20px] cursor-pointer' onClick={changeTheme}><MdLightMode /></i>
                    <i className='features text-[20px] cursor-pointer'><AiOutlineExpandAlt /></i>
                  </div>

                </div>
                <Editor height="83vh" theme={islightMode ? "vs-light" : "vs-dark"}  defaultLanguage="javascript" defaultValue="// some comment" />
            </div>
            <iframe id='output' className='w-[50%] min-h-[89vh] bg-[#fff] text-black'>iframe</iframe>
        </div>
    </>
  )
}

export default EditorApp