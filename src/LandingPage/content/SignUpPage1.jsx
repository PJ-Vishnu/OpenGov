import { useState } from "react";
import { Link } from "react-router-dom"
import SignUpPage2Citizen from "./SignUpPage2Citizen";
import SignUpPage2Company from "./SignUpPage2Company";
function SignUpPage1() {

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
        <div className="flex flex-col w-[98.8%] justify-center">
            <div className="text-center">
                <b className="text-[36px]">Sign Up</b>
            </div>
            <hr />
            <div className="flex flex-col w-[98.8%] h-[79vh] m-3 self-center border-[2px] border-[#213361] rounded-[20px] text-center items-center overflow-scroll overflow-x-hidden">
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
                        <div><input type="radio" onChange={handleChange}  name="usertype" id="usertype" value={"Citizen"} className="w-6 h-6" /> <b className="text-[20px] self-start">Citizen</b></div>
                        <div><input type="radio" onChange={handleChange}  name="usertype" id="usertype" value={"Company"} className="w-6 h-6" /> <b className="text-[20px] self-start">Company</b></div>
                    </div>
                </div>}
                { userType === 'Citizen' && next === false && <SignUpPage2Citizen/>}
                { userType === 'Company' && next === false && <SignUpPage2Company/>}
                    <br />
                    <b className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 pl-5 pr-5 self-center" onClick={handleNext}><Link >Next</Link></b><br />
            </div>
        </div>
    )
}
export default SignUpPage1