import React from 'react'
import code from "../images/code.png"
import delimg from "../images/delete.png"

const ListCard = () => {
  return (
    <div className="listcard mb-2 flex items-center justify-between w-full p-[10px] bg-[#141414] rounded-lg cursor-pointer hover:bg-[#202020]">
        <div className='flex items-center gap-2'>
            <img className='w-[80px]' src={code} alt="" />
            <div>
                <h3 className='text-[20px]'>My first Project</h3>
                <p className='text-[gray] text-[14px]'>Craeted on 9 nov 2023</p>
            </div>
        </div>
        <div>
            <img className='w-[30px] cursor-pointer mr-4' src={delimg} alt="" />
        </div>
    </div>
  )
}

export default ListCard