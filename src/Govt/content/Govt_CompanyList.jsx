import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { errorToast } from "../../Toast";
import { useSearch } from "../../Components/SearchContext";
import Pagination from "../../Components/Pagination";

function Govt_CompanyList() {
    const [data, setData] = useState([]);
    const { searchTerm } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchCompanies();
    }, [searchTerm]);
    
    const fetchCompanies = async () => {
        try {
            const response = await axios.get('https://opengov-server.onrender.com/register/getallcompany');
            let filteredData = response.data.result;
    
            if (searchTerm) {
                filteredData = filteredData.filter((company) =>
                    company.username.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
    
            setData(filteredData);
        } catch (error) {
            errorToast(error.response.data.message || 'Error fetching companies');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div>
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s" >Company ID</th>
                        <th className="border pt-3 pb-3s" >Company Name</th>
                        <th className="border pt-3 pb-3s" >Address</th>
                        <th className="border pt-3 pb-3s" >Email</th>
                        <th className="border pt-3 pb-3s" >Phone</th>
                        <th className="border pt-3 pb-3s" >View</th>
                    </tr>
                    {
                        currentItems.map((item) => { //map data to page elements
                            return (
                                <tr className="text-center">
                                    <td className="border pt-3 pb-3 ">
                                        <img src={`https://opengov-server.onrender.com/${item?.avatar}`} className="w-32 h-32" alt="avatar" />
                                    </td>
                                    <td className="border pt-3 pb-3 ">{item._id}</td>
                                    <td className="border pt-3 pb-3 ">{item.username}</td>
                                    <td className="border pt-3 pb-3 ">{item.address}</td>
                                    <td className="border pt-3 pb-3 ">{item.email}</td>
                                    <td className="border pt-3 pb-3 ">{item.phone}</td>
                                    <td className="border pt-3 pb-3 ">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                            <Link to={`viewcompany/${item._id}`}><GrView color="#213361" size={25} /></Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
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
export default Govt_CompanyList