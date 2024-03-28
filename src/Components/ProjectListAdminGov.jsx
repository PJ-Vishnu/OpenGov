import { AdminProjectList } from "../data/admin"
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { errorToast, successToast } from "../Toast";
import { GrSort } from "react-icons/gr";
import { FiFilter } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";


function ProjectListAdminGov() {
    return (
        <div>
            <div className="">
                <div className="  w-[98.2%] h=[20px] flex gap-9 p-3 m-3 border-[3px] border-[#213361] justify-center text-white"><div className="bg-[#313361] p-2 pl-3 pr-3 flex  "><GrSort size={25} className="pr-2" />Sort</div> <div className="bg-[#313361] p-2 pl-3 pr-3 flex"><FiFilter size={25} className="pr-2" />Filter</div></div>
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
                                            <Link to={'editproject'}><FiEdit color="#213361" size={25} /></Link>
                                            <MdDeleteOutline onClick={() => {
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
            <Link to={"newproject"}>
                    <div className="absolute right-9     bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                        <VscNewFile color="#213361" size={30} />
                    </div>
                </Link>
        </div>
    )
}
export default ProjectListAdminGov