import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import EditCompanyP2 from "./EditCompanyP2";
import axios from "axios";
function EditCompanyP1() {

    const [userType, setUserType] = useState('');
    const [next, setNext] = useState(true);
    const [formdata, setFormdata] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        avatar: '',
        dob: '',
        phone: '',
        address: '',
        gender: '',
        organisationName: '',
        organisationDetails: '',
        confirmpass: ''
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/register/updateuser/${id}`);
                const userData = response.data.result; 
                setFormdata(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChangeEvent = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/register/updateuser/${id}`, formdata);
            console.log('User data updated successfully:', response.data);
            // Redirect or show success message
        } catch (error) {
            console.error('Error updating user data:', error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        setUserType(e.target.value);
        setFormdata({ ...formdata, role: e.target.value });
    };

    const handleNext = () => {
        if (formdata.role === "") {
            alert("Please select a user type (Citizen).");
            return;
        } 
        setNext(false);
    };
    return (
        <div>
            <div className="text-center">
                <b className="text-[36px]">Edit Company</b>
            </div>
            <hr />
            <div className="flex flex-col w-[98.8%] h-[100vh] border-[2px] border-[#213361] rounded-[20px] m-3 text-center items-center overflow-scroll overflow-x-hidden">
            {next && <div className="flex flex-col w-11/12">
                    <br />
                    <b className="text-[20px] self-start">Username</b>
                    <input type="text" name="username" placeholder="Enter your Username" value={formdata.username} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Email</b>
                    <input type="email" name="email" placeholder="Enter your Email ID" value={formdata.email} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Password</b>
                    <input type="password" name="password" placeholder="Enter your Password" value={formdata.password} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Confirm Password</b>
                    <input type="password" name="confirmpass" placeholder="Confirm your Password" value={formdata.confirmpass} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">User Type</b>
                    <div className="flex gap-10">
                        <div><input type="radio" name="role" value="citizen" onLoad={handleChange} checked={formdata.role === "citizen"} disabled className="text-[20px] w-5 h-5" /> <b className="text-[20px] self-start">Citizen</b></div>
                        <div><input type="radio" name="role" value="company" onLoad={handleChange} checked={formdata.role === "company"}  className="text-[20px] w-5 h-5" /> <b className="text-[20px] self-start">Company</b></div>
                    </div>
                    <button className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 pl-5 pr-5 self-center" onClick={handleNext}>Next</button><br />
                </div>}
                {formdata.role === 'company' && next === false && <EditCompanyP2 handleChangeEvent={handleChangeEvent} formdata={formdata}  handleSubmit={handleSubmit} />}
            </div>
        </div>
    )
}
export default EditCompanyP1