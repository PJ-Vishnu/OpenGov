import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrSort } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { ImHammer2 } from "react-icons/im";
import { GrView } from "react-icons/gr";
import axios from "axios";
import { errorToast, successToast } from "../../Toast";
import { useSearch } from "../../Components/SearchContext";
import Pagination from "../../Components/Pagination";

function CompanyTenderingProjectList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("");
    const [filterBy, setFilterBy] = useState("");

    const { searchTerm } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
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
            <div className="flex gap-9 p-3 m-3 border-[3px] border-[#213361] justify-center text-white">
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
            <table className="border-collapse font-sans w-[98.2%] m-3">
                <thead>
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3">Project ID</th>
                        <th className="border pt-3 pb-3">Project Name</th>
                        <th className="border pt-3 pb-3">Location</th>
                        <th className="border pt-3 pb-3">Initiator</th>
                        <th className="border pt-3 pb-3">Budget</th>
                        <th className="border pt-3 pb-3">Tendering Date</th>
                        <th className="border pt-3 pb-3">View/Bid</th>
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
                        currentItems.map((item) => (
                            <tr key={item._id} className="text-center">
                                <td className="border pt-3 pb-3">{item._id}</td>
                                <td className="border pt-3 pb-3">{item.projectName}</td>
                                <td className="border pt-3 pb-3">{item.location}</td>
                                <td className="border pt-3 pb-3">{item.Initiator}</td>
                                <td className="border pt-3 pb-3">{item.budget}</td>
                                <td className="border pt-3 pb-3">{formatDate(item.tenderingLastDate)}</td>
                                <td className="border pt-3 pb-3">
                                    <div className="flex align-middle w-full justify-center items-center gap-8">
                                        <Link to={`viewproject/${item._id}`}>
                                            <GrView color="#213361" size={25} />
                                        </Link>
                                        <Link to={`newtender/${item._id}`}>
                                            <ImHammer2 color="#213361" size={25} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={data.length}
                paginate={paginate}
            />
        </div>
    );
}

export default CompanyTenderingProjectList;
