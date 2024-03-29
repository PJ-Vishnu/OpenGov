import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuUserPlus } from "react-icons/lu";

function GovtNotifications() {
    return (
        <div>
            <div>
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s" >NID</th>
                        <th className="border pt-3 pb-3s" >Notification</th>
                        <th className="border pt-3 pb-3s" >Time</th>
                    </tr>
                    <tr className="text-center">
                        <td className="border pt-3 pb-3 ">ID</td>
                        <td className="border pt-3 pb-3 ">Notification</td>
                        <td className="border pt-3 pb-3 ">Time</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default GovtNotifications