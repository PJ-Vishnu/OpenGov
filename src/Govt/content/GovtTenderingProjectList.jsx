import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { errorToast, successToast } from "../../Toast";
import { GrSort } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";


function GovtTenderingProjectList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        try {
            const response = await axios.get('http://localhost:4000/projects/projects');
            const currentDate = new Date();
            const tenderingProjects = response.data.result.filter(project => {
                return project.status === "tendering" && new Date(project.tenderingLastDate) > currentDate;
            });
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

    return (
        <div>
            <div className="">
                <div className="  w-[98.2%] h=[20px] flex gap-9 p-3 m-3 border-[3px] border-[#213361] justify-center text-white"><div className="bg-[#313361] p-2 pl-3 pr-3 flex  "><GrSort size={25} className="pr-2" />Sort</div> <div className="bg-[#313361] p-2 pl-3 pr-3 flex"><FiFilter size={25} className="pr-2" />Filter</div></div>
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
export default GovtTenderingProjectList