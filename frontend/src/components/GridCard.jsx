import React from 'react'
import code from "../images/code.png"
import delimg from "../images/delete.png"

const GridCard = () => {
  return (
    <div className="gridCard bg-[#141414] p-[10px] w-[250px] h-[180px] rounded-lg shadow-lg shadow-black cursor-pointer hover:bg-[#202020]">
        <img className='w-[80px]' src={code} alt="" />
        <h3 className='text-[20px] w-[90%] line-clamp-1'>My first Project</h3>
        <div className='flex items-center justify-between'>
            <p className='text-[gray] text-[14px]'>Craeted on 9 nov 2023</p>
            <img className='w-[25px] cursor-pointer' src={delimg} alt="" />
        </div>
    </div>
  )
}

export default GridCard