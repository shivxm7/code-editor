import React, { useState } from "react";
import code from "../images/code.png";
import delimg from "../images/delete.png";

const ListCard = () => {
  const [isDeleteModel, setisDeleteModel] = useState(false);
  return (
    <>
      <div className="listcard mb-2 flex items-center justify-between w-full p-[10px] bg-[#141414] rounded-lg cursor-pointer hover:bg-[#202020]">
        <div className="flex items-center gap-2">
          <img className="w-[80px]" src={code} alt="" />
          <div>
            <h3 className="text-[20px]">My first Project</h3>
            <p className="text-[gray] text-[14px]">Craeted on 9 nov 2023</p>
          </div>
        </div>
        <div>
          <img
            onClick={() => {
              setisDeleteModel(true);
            }}
            className="w-[30px] cursor-pointer mr-4"
            src={delimg}
            alt=""
          />
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

export default ListCard;
