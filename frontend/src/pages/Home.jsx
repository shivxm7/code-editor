import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";

const Home = () => {
  const [createProj, setCreateProj] = useState(false);
  const [isGridLayout, setisGridLayout] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex items-start-center justify-between px-[100px] my-[40px]">
        <h1 className="text-2xl">Hi Shivam 👋</h1>
        <div className="inputbox flex gap-1 items-center !w-[350px]">
          <input type="text" placeholder="Search Here..." />
          <button
            onClick={() => {
              setCreateProj(true);
            }}
            className="btnBlue text-[20px] !p-[5px] !px-[10px]"
          >
            +
          </button>
        </div>
      </div>

      <div className="cards">
        {!isGridLayout ? (
          <div className="list px-[100px]">
            <ListCard />
            <ListCard />
            <ListCard />
          </div>
        ) : (
          <div className="grid px-[100px]">
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
          </div>
        )}
      </div>

      {createProj ? (
        <div className="modelCon fixed top-0 left-0 bottom-0 h-screen w-screen bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
          <div className="mainModel w-[25vw] h-[27vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
            <h3 className="text-2xl">Create New Project</h3>
            <div className="inputbox !bg-[#202020] mt-3">
              <input type="text" placeholder="Project Title" />
            </div>

            <div className="flex items-center gap-2 w-full mt-4">
              <button className="w-[49%] btnBlue hover:bg-[#61bcd3] rounded-[5px] mb-4 !p-[5px] !px-[10px] !py-[10px]">
                Create
              </button>
              <button
                onClick={() => {
                  setCreateProj(false);
                }}
                className="w-[49%] bg-[#1A1919] hover:bg-[#302f2f] rounded-[5px] mb-4 !p-[5px] !px-[10px] !py-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
