import { useState } from "react";
import { Link } from "react-router-dom"
import EditCompanyP2 from "./EditCompanyP2";
import CreateCompanyAdminP2 from "./CreateCompanyAdminP2";
function CreateCompanyAdminP1() {

    const [userType,setUserType] = useState('')
    const [next,setNext] = useState(true)
    const [citizen,setCitizen] = useState(true)

    const handleChange = (e)=>{
        console.log(e.target.value);
        setUserType(e.target.value)
    }
    const handleNext = ()=>{
        setNext(false)
    }
    return (
        <div>
            <div className="text-center">
                <b className="text-[36px]">Create new Company</b>
            </div>
            <hr />
            <div className="flex flex-col w-full h-[100vh] border-[2px] border-[#213361] rounded-[20px] m-3 text-center items-center overflow-scroll overflow-x-hidden">
                { next && <div className="flex flex-col w-11/12">
                    <br />
                    <b className="text-[20px] self-start">Username</b>
                    <input type="text" name="" id="" placeholder="Enter your Username" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Email</b>
                    <input type="email" name="" id="" placeholder="Enter your Email ID" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Password</b>
                    <input type="password" name="" id="" placeholder="Enter your Password" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Confirm Password</b>
                    <input type="password" name="" id="" placeholder="Confirm your Password" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">User Type</b>
                    <div className="flex gap-10">
                        <div><input type="radio" onChange={handleChange} disabled  name="usertype" id="usertype" value={"Citizen"} className="text-[20px] w-5 h-5" /> <b className="text-[20px] self-start">Citizen</b></div>
                        <div><input type="radio" onChange={handleChange}  name="usertype" id="usertype" value={"Company"} className="text-[20px] w-5 h-5" /> <b className="text-[20px] self-start">Company</b></div>
                    </div>
                </div>}
                { userType === 'Company' && next === false && <CreateCompanyAdminP2/>}
                    <b className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 pl-5 pr-5 self-center" onClick={handleNext}><Link >Next</Link></b>
            </div>
        </div>
    )
}
export default CreateCompanyAdminP1