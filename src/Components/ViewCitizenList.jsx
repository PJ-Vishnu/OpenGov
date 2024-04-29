import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuUserPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { errorToast } from "../Toast";

function ViewUserList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApi();
    }, []);

    const fetchApi = async () => {
        try {
            const response = await axios.get('http://localhost:4000/register/getallcitizen');
            setData(response?.data?.result);
        } catch (error) {
            errorToast(error.response.data.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/register/deleteuser/${userId}`);
            // Remove the deleted user from the state
            setData(data.filter(user => user._id !== userId));
            // Optionally, show a success message
            // successToast('User deleted successfully');
        } catch (error) {
            console.log();
            errorToast(error.response.data.message || 'Error deleting user');
        }
    };

    return (
        <div>
            <table className="border-collapse font-sans w-[98.2%] m-3">
                <thead>
                    <tr className="font-bold text-[#213361]">
                        <th className="border pt-3 pb-3">User ID</th>
                        <th className="border pt-3 pb-3">User Name</th>
                        <th className="border pt-3 pb-3">Address</th>
                        <th className="border pt-3 pb-3">Email</th>
                        <th className="border pt-3 pb-3">Phone</th>
                        <th className="border pt-3 pb-3">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center">Loading...</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item._id} className="text-center">
                                <td className="border pt-3 pb-3">{item._id}</td>
                                <td className="border pt-3 pb-3">
                                    <img src={`http://localhost:4000/${item?.avatar}`} className="w-32 h-32" alt="avatar" />
                                </td>
                                <td className="border pt-3 pb-3">{item.username}</td>
                                <td className="border pt-3 pb-3">{item.address}</td>
                                <td className="border pt-3 pb-3">{item.email}</td>
                                <td className="border pt-3 pb-3">{item.phone}</td>
                                <td className="border pt-3 pb-3">
                                    <div className="flex align-middle w-full justify-center items-center gap-8">
                                        <Link to={`/admin/viewusers/editcitizen/${item._id}`}><FiEdit color="#213361" size={25} /></Link>
                                        <MdDeleteOutline color="#ff6060" size={25} onClick={() => deleteUser(item._id)} style={{ cursor: 'pointer' }} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Link to={"newcitizen"}>
                <div className="absolute right-9 bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <LuUserPlus color="#213361" size={30} />
                </div>
            </Link>
        </div>
    );
}

export default ViewUserList;
