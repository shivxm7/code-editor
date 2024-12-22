import React, { useState } from "react";
import code from "../images/code.png";
import { useNavigate } from "react-router-dom";
import delimg from "../images/delete.png";

const GridCard = ({ item }) => {
  const [isDeleteModel, setisDeleteModel] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="gridCard bg-[#141414] p-[10px] w-[250px] h-[180px] rounded-lg shadow-lg shadow-black cursor-pointer hover:bg-[#202020]">
        <div
          onClick={() => {
            navigate(`/editorApp/${item._id}`);
          }}
        >
          <img className="w-[80px]" src={code} alt="" />
          <h3 className="text-[20px] w-[90%] line-clamp-1">{item.title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-[gray] text-[14px]">
              Created on {new Date(item.date).toDateString()}
            </p>
            <img
              onClick={() => {
                setisDeleteModel(true);
              }}
              className="w-[25px] cursor-pointer"
              src={delimg}
              alt=""
            />
          </div>
        </div>
      </div>

      {isDeleteModel ? (
        <div className="model fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[22vh] bg-[#141414] p-[20px] rounded-lg">
            <h3 className="text-3xl">
              Do you want to delete <br /> this Project
            </h3>

            <div className="flex w-full mt-3 items-center gap-2">
              <div className="p-[10px] bg-[#FF4343] hover:bg-[#eb4747] text-white text-center cursor-pointer rounded-lg min-w-[49%]">
                Delete
              </div>
              <div
                onClick={() => {
                  setisDeleteModel(false);
                }}
                className="p-[10px] bg-[#1A1919] hover:bg-[#313030] text-white text-center cursor-pointer rounded-lg min-w-[49%]"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GridCard;
