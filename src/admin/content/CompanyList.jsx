import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

function CompanyList() {
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
                        <th className="border pt-3 pb-3s" >View/Edit/Delete</th>
                    </tr>
                    <tr className="text-center">
                        <td className="border pt-3 pb-3 ">ID</td>
                        <td className="border pt-3 pb-3 ">Company1</td>
                        <td className="border pt-3 pb-3 ">Addressofcompany1</td>
                        <td className="border pt-3 pb-3 ">company1@gmail.com</td>
                        <td className="border pt-3 pb-3 ">0123456789</td>
                        <td className="border pt-3 pb-3 ">
                            <div className="flex align-middle w-full justify-center items-center gap-8">
                                <GrView color="#213361" size={25} />
                                <FiEdit color="#213361" size={25} />
                                <MdDeleteOutline color="#ff6060" size={25} />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default CompanyList