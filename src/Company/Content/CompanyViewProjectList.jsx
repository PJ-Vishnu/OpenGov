import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { VscReport } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { errorToast, successToast } from "../../Toast";
import { GrSort } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../../Components/SearchContext";
import Pagination from "../../Components/Pagination";


function CompanyViewProjectList() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [sortBy, setSortBy] = useState("");
    const [filterBy, setFilterBy] = useState("");

    const { searchTerm } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://opengov-server.onrender.com/projects/projects");
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

    const checkProjectOrContract = async (itemId) => {
        try {
          const response = await axios.get(`https://opengov-server.onrender.com/projects/type/${itemId}`);
          if (response.data.type=='tendering') {
            navigate(`/company/projects/viewTenderingProject/${itemId}`); 
          }else{
            console.log(response.data.type);
            navigate(`/company/projects/viewproject/${itemId}`);
          }
        } catch (error) {
          console.error('Error checking item type:', error);
        }
      };

      const handleViewProject = (itemId) => {
        checkProjectOrContract(itemId);
        
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
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s" >Project ID</th>
                        <th className="border pt-3 pb-3s" >Project Name</th>
                        <th className="border pt-3 pb-3s" >Location</th>
                        <th className="border pt-3 pb-3s" >Initiator</th>
                        <th className="border pt-3 pb-3s" >Budget</th>
                        <th className="border pt-3 pb-3s" >View</th>
                    </tr>
                    {
                        currentItems.map((item) => { //map data to page elements
                            return (
                                <tr className="text-center">
                                    <td className="border pt-3 pb-3 ">{item._id}</td>
                                    <td className="border pt-3 pb-3 ">{item.projectName}</td>
                                    <td className="border pt-3 pb-3 ">{item.location}</td>
                                    <td className="border pt-3 pb-3 ">{item.Initiator}</td>
                                    <td className="border pt-3 pb-3 ">{item.budget}</td>
                                    <td className="border pt-3 pb-3 ">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                        <button onClick={() => handleViewProject(item._id)}><GrView color="#213361" size={25} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    { }
                </table>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={data.length}
                paginate={paginate}
            />
        </div>
    )
}
export default CompanyViewProjectList