import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { GrSort } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";
import { errorToast, successToast } from "../Toast";
import { useSearch } from "./SearchContext";

function ProjectListAdminGov() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [sortBy, setSortBy] = useState(""); // State variable for sorting criteria
    const [filterBy, setFilterBy] = useState(""); // State variable for filtering criteria
    const { searchTerm } = useSearch();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:4000/projects/projects");
            let filteredData = response.data.result;
      
            if (searchTerm) {
              filteredData = filteredData.filter((project) =>
                project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
      
            setData(filteredData);
          } catch (error) {
            errorToast(error.response.data.message || "error");
          }
        };
      
        fetchData();
      }, [searchTerm]);
      

    const sortData = (criteria) => {
        // Update sortBy state
        setSortBy(criteria);
        // Sort data based on criteria
        const sortedData = [...data].sort((a, b) => {
            if (criteria === "projectName") {
                return a.projectName.localeCompare(b.projectName);
            } else if (criteria === "budget") {
                return a.budget - b.budget;
            } else if (criteria === "id") {
                return a._id.localeCompare(b._id);
            }
            return 0;
        });
        setData(sortedData);
    };

    const filterData = (criteria) => {
        // Update filterBy state
        setFilterBy(criteria);
        // Filter data based on criteria
        const filteredData = [...data].filter((item) => {
            if (criteria === "state") {
                return item.initiator === "state";
            } else if (criteria === "district") {
                return item.initiator === "district";
            } else if (criteria === "panchayath") {
                return item.initiator === "panchayath";
            }
            return true;
        });

        setData(filteredData);
    };

    const handleViewProject = (itemId) => {
        navigate(`/govt/projects/viewproject/${itemId}`);
    };

    const deleteProject = async (projectID) => {
        try {
            await axios.delete(`http://localhost:4000/projects/deleteProject/${projectID}`);
            setData(data.filter((project) => project._id !== projectID));
            successToast("Project deleted successfully");
        } catch (error) {
            errorToast(error.response.data.message || "Error deleting Project");
        }
    };

    return (
        <div>
            <div className="flex gap-4 p-3 m-3 border-[3px] border-[#213361] justify-center text-white">
                <select
                    className="bg-[#313361] p-2 pl-3 pr-3 flex items-center"
                    onChange={(e) => sortData(e.target.value)}
                    value={sortBy}
                >
                    <option value="">Sort By</option>
                    <option value="projectName">Project Name</option>
                    <option value="budget">Budget</option>
                    <option value="id">ID</option>
                </select>
                <select
                        className="bg-[#313361] p-2 pl-3 pr-3 flex items-center"
                        onChange={(e) => filterData(e.target.value)}
                        value={filterBy}
                    >
                        <option value="">Filter By</option>
                        <option value="state">State</option>
                        <option value="district">District</option>
                        <option value="panchayath">Panchayath</option>
                    </select>
            </div>
            <div className="">
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s">Project ID</th>
                        <th className="border pt-3 pb-3s">Project Name</th>
                        <th className="border pt-3 pb-3s">Location</th>
                        <th className="border pt-3 pb-3s">Initiator</th>
                        <th className="border pt-3 pb-3s">Budget</th>
                        <th className="border pt-3 pb-3s">View/Edit/Delete</th>
                    </tr>
                    {data.map((item) => (
                        <tr className="text-center" key={item._id}>
                            <td className="border pt-3 pb-3 ">{item._id}</td>
                            <td className="border pt-3 pb-3 ">{item.projectName}</td>
                            <td className="border pt-3 pb-3 ">{item.location}</td>
                            <td className="border pt-3 pb-3 ">{item.initiator}</td>
                            <td className="border pt-3 pb-3 ">{item.budget}</td>
                            <td className="border pt-3 pb-3 ">
                                <div className="flex align-middle w-full justify-center items-center gap-8">
                                    <button onClick={() => handleViewProject(item._id)}>
                                        <GrView color="#213361" size={25} />
                                    </button>
                                    <Link to={`/govt/projects/editproject/${item._id}`}>
                                        <FiEdit color="#213361" size={25} />
                                    </Link>
                                    <MdDeleteOutline
                                        color="#ff6060"
                                        size={25}
                                        onClick={() => deleteProject(item._id)}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <Link to={"newproject"}>
                <div className="absolute right-9 bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <VscNewFile color="#213361" size={30} />
                </div>
            </Link>
        </div>
    );
}

export default ProjectListAdminGov;
