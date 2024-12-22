import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { api_based_url } from "../helper";

const Home = () => {
  const [createProj, setCreateProj] = useState(false);
  const [isGridLayout, setisGridLayout] = useState(false);
  const [projData, setProjData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const [projectTitle, setProjectTitle] = useState("");
  const navigate = useNavigate();

  // Search query
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProjects = projData?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createProject = (e) => {
    if (projectTitle === "") {
      alert("Enter Project title first");
    } else {
      fetch(api_based_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projectTitle,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCreateProj(false);
            setProjectTitle("");
            alert("Project created succesfully");
            navigate(`/EditorApp/${data.projectId}`);
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  const getProj = (e) => {
    fetch(api_based_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjData(data.projects);
        } else {
          setError(data.message);
        }
      });
  };

  useEffect(() => {
    getProj();
  }, []);

  useEffect(() => {
    fetch(api_based_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.user);
        } else {
          setError(data.message);
        }
      });
  }, []);

  return (
    <>
      <Navbar isGridLayout={isGridLayout} setisGridLayout={setisGridLayout} />
      <div className="flex items-start-center justify-between px-[100px] my-[40px]">
        <h1 className="text-2xl">Hi! {data ? data.name : ""} 👋</h1>
        <div className="inputbox flex gap-1 items-center !w-[350px]">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            type="text"
            placeholder="Search Here..."
          />
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
            {filteredProjects && filteredProjects.length > 0 ? (
              filteredProjects.map((item, index) => {
                return <ListCard key={index} item={item} />;
              })
            ) : (
              <p>No projects found.</p>
            )}

            {/* <ListCard />
            <ListCard />
            <ListCard /> */}
          </div>
        ) : (
          <div className="grid px-[100px]">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item, index) => {
                return <GridCard key={index} item={item} />;
              })
            ) : (
              <p>No projects found.</p>
            )}

            {/* <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard /> */}
          </div>
        )}
      </div>

      {createProj ? (
        <div className="modelCon fixed top-0 left-0 bottom-0 h-screen w-screen bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
          <div className="mainModel w-[25vw] h-[27vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
            <h3 className="text-2xl">Create New Project</h3>
            <div className="inputbox !bg-[#202020] mt-3">
              <input
                onChange={(e) => setProjectTitle(e.target.value)}
                type="text"
                placeholder="Project Title"
                value={projectTitle}
              />
            </div>

            <div className="flex items-center gap-2 w-full mt-4">
              <button
                onClick={createProject}
                className="w-[49%] btnBlue hover:bg-[#61bcd3] rounded-[5px] mb-4 !p-[5px] !px-[10px] !py-[10px]"
              >
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
