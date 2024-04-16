import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsBuildingAdd } from "react-icons/bs";
import { useEffect, useState } from "react";
import { errorToast } from "../Toast";
import axios from "axios";

function CompanyList() {

    const [data, setData] = useState([])
    useEffect(() => {
        fetchApi()
        console.log('useeffect is loading..');
    }, [])

    const fetchApi = (async () => {

        console.log('api calling starting...');
        try {
            const response = await axios.get('http://localhost:4000/register/getallcompany')
            console.log(response)
            setData(response?.data?.result)
        } catch (error) {
            errorToast(error.response.data.message || 'error')
        }
    })

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
                    {
                        data && data.map((item) => { //map data to page elements
                            return (
                                <tr className="text-center">
                                    <td className="border pt-3 pb-3 ">{item._id}</td>
                                    <td className="border pt-3 pb-3 ">{item.username}</td>
                                    <td className="border pt-3 pb-3 ">{item.address}</td>
                                    <td className="border pt-3 pb-3 ">{item.email}</td>
                                    <td className="border pt-3 pb-3 ">{item.phone}</td>
                                    <td className="border pt-3 pb-3 ">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                            <Link to={'viewcompany'}><GrView color="#213361" size={25} /></Link>
                                            <Link to={'editcompany'}><FiEdit color="#213361" size={25} /></Link>
                                            <MdDeleteOutline color="#ff6060" size={25} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </table>
            </div>
            <Link to={"newcompany"}>
                <div className="absolute right-9     bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <BsBuildingAdd color="#213361" size={30} />
                </div>
            </Link>
        </div>
    )
}
export default CompanyList