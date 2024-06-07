import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { VscReport } from "react-icons/vsc";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { errorToast, successToast } from "../../Toast";
import { GrSort } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../../Components/SearchContext";


function CompanyOurProject() {

    const [data, setData] = useState([])
    const { searchTerm } = useSearch();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const companyId = localStorage.getItem('company-id');
                const response = await axios.get(`http://localhost:4000/contracts/ourProjects/${companyId}`);
                let filteredData = response?.data?.result || [];
    
                if (searchTerm) {
                    filteredData = filteredData.filter(project =>
                        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
    
                setData(filteredData);
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

    return (
        <div>
            <div className="">
                <div className="  w-[98.2%] h=[20px] flex gap-9 p-3 m-3 border-[3px] border-[#213361] justify-center text-white"><div className="bg-[#313361] p-2 pl-3 pr-3 flex  "><GrSort size={25} className="pr-2" />Sort</div> <div className="bg-[#313361] p-2 pl-3 pr-3 flex"><FiFilter size={25} className="pr-2" />Filter</div></div>
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s" >Contract ID</th>
                        <th className="border pt-3 pb-3s" >Project Name</th>
                        <th className="border pt-3 pb-3s" >Location</th>
                        <th className="border pt-3 pb-3s" >Initiator</th>
                        <th className="border pt-3 pb-3s" >Project End Date</th>
                        <th className="border pt-3 pb-3s" >View</th>
                    </tr>
                    {
                        data.map((item) => {
                            return (
                                <tr className="text-center">
                                    <td className="border pt-3 pb-3 ">{item._id}</td>
                                    <td className="border pt-3 pb-3 ">{item.projectName}</td>
                                    <td className="border pt-3 pb-3 ">{item.Location}</td>
                                    <td className="border pt-3 pb-3 ">{item.initiator}</td>
                                    <td className="border pt-3 pb-3 ">{formatDate(item.projectEndDate)}</td>
                                    <td className="border pt-3 pb-3 ">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                            <Link to={`viewproject/${item._id}`}><GrView color="#213361" size={25} /></Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }


                </table>
            </div>
        </div>
    )
}
export default CompanyOurProject
