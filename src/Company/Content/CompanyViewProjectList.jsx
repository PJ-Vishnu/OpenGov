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


function CompanyViewProjectList() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchApi()
        console.log('useeffect is loading..');
    }, [])

    const fetchApi = (async () => {

        console.log('api calling starting...');
        try {
            const response = await axios.get('http://localhost:4000/projects/projects')
            setData(response?.data?.result)
        } catch (error) {
            errorToast(error.response.data.message || 'error')
        }
    })

    const deleteProject = async (projectID) => {
        try {
            await axios.delete(`http://localhost:4000/projects/deleteProject/${projectID}`);
            // Remove the deleted user from the state
            setData(data.filter(project => project._id !== projectID));
            // Optionally, show a success message
            successToast('Project deleted successfully')
        } catch (error) {
            console.log();
            errorToast(error.response.data.message || 'Error deleting Project');
        }
    };




    return (
        <div>
            <div className="">
                {/* {
                    data && data.map((item) => {
                        return (
                            <div className="">
                                <p>{item.projectName}</p>
                            </div>
                        )
                    })
                } */}
                <div className="  w-[98.2%] h=[20px] flex gap-9 p-3 m-3 border-[3px] border-[#213361] justify-center text-white"><div className="bg-[#313361] p-2 pl-3 pr-3 flex  "><GrSort size={25} className="pr-2" />Sort</div> <div className="bg-[#313361] p-2 pl-3 pr-3 flex"><FiFilter size={25} className="pr-2" />Filter</div></div>
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
                        data && data.map((item) => { //map data to page elements
                            return (
                                <tr className="text-center">
                                    <td className="border pt-3 pb-3 ">{item._id}</td>
                                    <td className="border pt-3 pb-3 ">{item.projectName}</td>
                                    <td className="border pt-3 pb-3 ">{item.location}</td>
                                    <td className="border pt-3 pb-3 ">{item.Initiator}</td>
                                    <td className="border pt-3 pb-3 ">{item.budget}</td>
                                    <td className="border pt-3 pb-3 ">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                            <Link to={`viewproject/${item._id}`}><GrView color="#213361" size={25} /></Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    { }
                </table>
            </div>
        </div>
    )
}
export default CompanyViewProjectList