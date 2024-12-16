import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import ListCard from '../components/ListCard'
import GridCard from '../components/GridCard'

const Home = () => {
  const [isGridLayout, setisGridLayout] = useState(true)
  return (
    <>
        <Navbar/>
        <div className='flex items-start-center justify-between px-[100px] my-[40px]'>
          <h1 className='text-2xl'>Hi Shivam 👋</h1>
          <div className="inputbox flex gap-1 items-center !w-[350px]">
            <input type="text" placeholder='Search Here...' />
            <button className='btnBlue text-[20px] !p-[5px] !px-[10px]'>+</button>
          </div>
        </div>

        <div className="cards">
          {
            !isGridLayout ?
              <div className="list px-[100px]">
                <ListCard/>
                <ListCard/>
                <ListCard/>
              </div> : <div className="grid px-[100px]">
                <GridCard/>
                <GridCard/>
                <GridCard/>
                <GridCard/>
                <GridCard/>
                <GridCard/>
              </div>
          }
        </div>
    </>
  )
}

export default Home