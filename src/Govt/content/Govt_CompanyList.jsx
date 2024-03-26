import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

function Govt_CompanyList() {
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
                    <tr className="text-center">
                        <td className="border pt-3 pb-3 ">ID</td>
                        <td className="border pt-3 pb-3 ">Company1</td>
                        <td className="border pt-3 pb-3 ">Addressofcompany1</td>
                        <td className="border pt-3 pb-3 ">company1@gmail.com</td>
                        <td className="border pt-3 pb-3 ">0123456789</td>
                        <td className="border pt-3 pb-3 ">
                            <div className="flex align-middle w-full justify-center items-center gap-8">
                                <Link to={'viewcompany'}><GrView color="#213361" size={25} /></Link>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default Govt_CompanyList