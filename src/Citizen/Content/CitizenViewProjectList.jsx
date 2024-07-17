import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GrView } from "react-icons/gr";
import { VscReport } from "react-icons/vsc";
import { errorToast } from "../../Toast";
import { GrSort } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { useSearch } from "../../Components/SearchContext";
import Pagination from "../../Components/Pagination";

function CitizenViewProjectList() {
    const [data, setData] = useState([]);
    const [sortBy, setSortBy] = useState(""); // State variable for sorting criteria
    const [filterBy, setFilterBy] = useState(""); // State variable for filtering criteria
    const { searchTerm } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get(`https://opengov-server.onrender.com/contracts/allProjects`);
                let filteredData = response?.data?.result || [];
                if (searchTerm) {
                    filteredData = filteredData.filter(project =>
                        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                setData(filteredData);
                console.log(response.data);
            } catch (error) {
                errorToast(error.response?.data?.message || 'error');
            }
        };

        fetchApi();
    }, [searchTerm]);


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
                return a.projectId.localeCompare(b.projectId);
            } else if (criteria === "projectName") {
                return a.projectName.localeCompare(b.projectName);
            } else if (criteria === "budget") {
                return a.budget - b.budget;
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s">Project ID</th>
                        <th className="border pt-3 pb-3s">Project Name</th>
                        <th className="border pt-3 pb-3s">Location</th>
                        <th className="border pt-3 pb-3s">Initiator</th>
                        <th className="border pt-3 pb-3s">Budget</th>
                        <th className="border pt-3 pb-3s">Project End Date</th>
                        <th className="border pt-3 pb-3s">View/Report</th>
                    </tr>
                    {
                        currentItems.map((item) => (
                            <tr className="text-center" key={item._id}>
                                <td className="border pt-3 pb-3">{item.projectId}</td>
                                <td className="border pt-3 pb-3">{item.projectName}</td>
                                <td className="border pt-3 pb-3">{item.location}</td>
                                <td className="border pt-3 pb-3">{item.initiator}</td>
                                <td className="border pt-3 pb-3">{item.budget}</td>
                                <td className="border pt-3 pb-3">{formatDate(item.projectEndDate)}</td>
                                <td className="border pt-3 pb-3">
                                    <div className="flex align-middle w-full justify-center items-center gap-8">
                                        <Link to={`viewproject/${item.projectId}`}><GrView color="#213361" size={25} /></Link>
                                        <Link to={`reportproject/${item._id}`}><VscReport color="#213361" size={25} /></Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </table>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={data.length}
                paginate={paginate}
            />
        </div>
    );
}

export default CitizenViewProjectList;
