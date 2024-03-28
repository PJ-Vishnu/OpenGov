import { MdDeleteOutline } from "react-icons/md";
import { BsReply } from "react-icons/bs";
import { RiChatNewLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Citizen_Interactions() {
    return (
        <div>
            <div>
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s" >Query ID</th>
                        <th className="border pt-3 pb-3s" >Location</th>
                        <th className="border pt-3 pb-3s" >Reply Recived</th>
                        <th className="border pt-3 pb-3s" >Reply/Delete</th>
                    </tr>
                    <tr className="text-center">
                        <td className="border pt-3 pb-3 ">QID</td>
                        <td className="border pt-3 pb-3 ">Location map</td>
                        <td className="border pt-3 pb-3 ">Description</td>
                        <td className="border pt-3 pb-3 ">
                            <div className="flex align-middle w-full justify-center items-center gap-8">
                                <Link to={'replycitizen'}><BsReply color="#213361" size={25} /></Link>
                                <MdDeleteOutline color="#ff6060" size={25} />
                            </div>
                        </td>
                    </tr>
                </table>
                <Link to={"/citizen/message"}>
                    <div className="absolute right-9     bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                        <RiChatNewLine color="#213361" size={30} />
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Citizen_Interactions