import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GrView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { GrSort } from "react-icons/gr";
import { errorToast } from "../../Toast";
import { useSearch } from "../../Components/SearchContext";

function GovtTenderingProjectList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(""); // State variable for sorting criteria
    const [filterBy, setFilterBy] = useState("");
    const { searchTerm } = useSearch();
    
    useEffect(() => {
        fetchApi();
    }, [searchTerm]);
    
    const fetchApi = async () => {
        try {
            const response = await axios.get('http://localhost:4000/projects/projects');
            const currentDate = new Date();
            let filteredProjects = response.data.result;
    
            // Apply filter based on searchTerm if it exists
            if (searchTerm) {
                filteredProjects = filteredProjects.filter(project =>
                    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
    
            const tenderingProjects = filteredProjects.filter(project =>
                project.status === "tendering" && new Date(project.tenderingLastDate) > currentDate
            );
    
            setData(tenderingProjects);
            setLoading(false);
        } catch (error) {
            errorToast(error.response?.data?.message || 'Error');
            setLoading(false);
        }
    };
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Get only the date part
    };

    const sortData = (criteria) => {
        // Update sortBy state
        setSortBy(criteria);
        // Sort data based on criteria
        const sortedData = [...data].sort((a, b) => {
            if (criteria === "projectId") {
                return a._id.localeCompare(b._id);
            } else if (criteria === "projectName") {
                return a.projectName.localeCompare(b.projectName);
            } else if (criteria === "budget") {
                return a.budget - b.budget;
            } else if (criteria === "tenderingDate") {
                return new Date(a.tenderingLastDate) - new Date(b.tenderingLastDate);
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
                return item.initiatorType === "state";
            } else if (criteria === "district") {
                return item.initiatorType === "district";
            } else if (criteria === "panchayath") {
                return item.initiatorType === "panchayath";
            }
            return true;
        });
        setData(filteredData);
    };

    return (
        <div>
            <div className="">
                <div className="w-[98.2%] h-fit flex gap-9 p-3 m-3 border-[3px] border-[#213361] justify-center text-white">
                    <select
                        className="bg-[#313361] p-2 pl-3 pr-3 flex items-center"
                        onChange={(e) => sortData(e.target.value)}
                        value={sortBy}
                    >
                        <option value="">Sort By</option>
                        <option value="projectId">Project ID</option>
                        <option value="projectName">Project Name</option>
                        <option value="budget">Budget</option>
                        <option value="tenderingDate">Tendering Date</option>
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
                <table className="border-collapse font-sans w-[98.2%] m-3">
                    <thead>
                        <tr className="font-bold text-[#213361]">
                            <th className="border pt-3 pb-3">Project ID</th>
                            <th className="border pt-3 pb-3">Project Name</th>
                            <th className="border pt-3 pb-3">Location</th>
                            <th className="border pt-3 pb-3">Initiator</th>
                            <th className="border pt-3 pb-3">Budget</th>
                            <th className="border pt-3 pb-3">Tendering Date</th>
                            <th className="border pt-3 pb-3">View/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item._id} className="text-center">
                                    <td className="border pt-3 pb-3">{item._id}</td>
                                    <td className="border pt-3 pb-3">{item.projectName}</td>
                                    <td className="border pt-3 pb-3">{item.location}</td>
                                    <td className="border pt-3 pb-3">{item.Initiator}</td>
                                    <td className="border pt-3 pb-3">{item.budget}</td>
                                    <td className="border pt-3 pb-3">{formatDate(item.tenderingLastDate)}</td>
                                    <td className="border pt-3 pb-3">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                            <Link to={`project/${item._id}`}>
                                                <GrView color="#213361" size={25} />
                                            </Link>
                                            <Link to={`deletetender/${item._id}`}>
                                                <MdDeleteOutline color="#213361" size={25} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GovtTenderingProjectList;
