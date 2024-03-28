import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuUserPlus } from "react-icons/lu";

function ViewUserList() {
    return (
        <div>
            <div>
                <table className="border-collapse font-sans w-[98.2%] m-3 ">
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3s" >User ID</th>
                        <th className="border pt-3 pb-3s" >User Name</th>
                        <th className="border pt-3 pb-3s" >Address</th>
                        <th className="border pt-3 pb-3s" >Email</th>
                        <th className="border pt-3 pb-3s" >Phone</th>
                        <th className="border pt-3 pb-3s" >Edit/Delete</th>
                    </tr>
                    <tr className="text-center">
                        <td className="border pt-3 pb-3 ">ID</td>
                        <td className="border pt-3 pb-3 ">Username</td>
                        <td className="border pt-3 pb-3 ">Addressofcompany1</td>
                        <td className="border pt-3 pb-3 ">username@gmail.com</td>
                        <td className="border pt-3 pb-3 ">0123456789</td>
                        <td className="border pt-3 pb-3 ">
                            <div className="flex align-middle w-full justify-center items-center gap-8">
                                <Link to={'editcitizen'}><FiEdit color="#213361" size={25} /></Link>
                                <MdDeleteOutline color="#ff6060" size={25} />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <Link to={"newcitizen"}>
                <div className="absolute right-9     bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <LuUserPlus color="#213361" size={30} />
                </div>
            </Link>
        </div>
    )
}
export default ViewUserList