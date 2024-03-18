import { AdminProjectList } from "../../data/admin"
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { errorToast, successToast } from "../../Toast";


function ProjectList() {
    return (
        <div>
            <div>
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s" >Project ID</th>
                        <th className="border pt-3 pb-3s" >Project Name</th>
                        <th className="border pt-3 pb-3s" >Location</th>
                        <th className="border pt-3 pb-3s" >Initiator</th>
                        <th className="border pt-3 pb-3s" >Budget</th>
                        <th className="border pt-3 pb-3s" >View/Edit/Delete</th>
                    </tr>
                    {
                        AdminProjectList.map((item) => {
                            return (
                                <tr className="text-center">
                                    <td className="border pt-3 pb-3 ">{item.ProjectID}</td>
                                    <td className="border pt-3 pb-3 ">{item.ProjectName}</td>
                                    <td className="border pt-3 pb-3 ">{item.Location}</td>
                                    <td className="border pt-3 pb-3 ">{item.Initiator}</td>
                                    <td className="border pt-3 pb-3 ">{item.Budget}</td>
                                    <td className="border pt-3 pb-3 ">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                        <Link to={'viewproject'}><GrView color="#213361" size={25} /></Link>
                                            <FiEdit color="#213361" size={25} />
                                            <MdDeleteOutline onClick={()=>{
                                                // confirm('qree')
                                                successToast("Hello")
                                                errorToast("Error")
                                            }} className="cursor-pointer" color="#ff6060" size={25} />
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
export default ProjectList