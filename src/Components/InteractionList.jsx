import { MdDeleteOutline } from "react-icons/md";
import { BsReply } from "react-icons/bs";
import { Link } from "react-router-dom";

function InteractionList() {
    return (
        <div>
            <div>
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s" >Query ID</th>
                        <th className="border pt-3 pb-3s" >User Name</th>
                        <th className="border pt-3 pb-3s" >Query Type</th>
                        <th className="border pt-3 pb-3s" >Project ID</th>
                        <th className="border pt-3 pb-3s" >Location</th>
                        <th className="border pt-3 pb-3s" >Description</th>
                        <th className="border pt-3 pb-3s" >Reply/Delete</th>
                    </tr>
                    <tr className="text-center">
                        <td className="border pt-3 pb-3 ">ID</td>
                        <td className="border pt-3 pb-3 ">Username</td>
                        <td className="border pt-3 pb-3 ">QT</td>
                        <td className="border pt-3 pb-3 ">PID</td>
                        <td className="border pt-3 pb-3 ">Location map</td>
                        <td className="border pt-3 pb-3 ">Description</td>
                        <td className="border pt-3 pb-3 ">
                            <div className="flex align-middle w-full justify-center items-center gap-8">
                                <Link to={'replycitizen'}><BsReply  color="#213361" size={25} /></Link>
                                <MdDeleteOutline color="#ff6060" size={25} />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default InteractionList