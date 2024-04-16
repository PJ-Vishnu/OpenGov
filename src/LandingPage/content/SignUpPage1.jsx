import { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import SignUpPage2Citizen from "./SignUpPage2Citizen";
import SignUpPage2Company from "./SignUpPage2Company";
function SignUpPage1() {

    const [next,setNext] = useState(true)
    const [citizen,setCitizen] = useState(true)


    // -------------------------------
    // const [username,setUsername] = new useState()
    // const [email,setEmail]= new useState()
    // const [password,setPassword] = new useState()
    // const [role,setrole] = useState()
    // const [avatar,setAvatar] = new useState()
    // const [dob,setDOB] = new useState()
    // const [phone,setPhone] = new useState()
    // const [address,setAddress] = new useState()
    // const [gender,setGender] = new useState()
    const [formdata,setFormdata] = useState({
        username:'',
        email:'',
        password:'',
        role:'',
        avatar:'',
        dob:'',
        phone:'',
        address:'',
        gender:'',
        organisationName:'',
        organisationDetails:'',
        confirmpass:''
    })


    const handleChangeEvent=(e)=>{
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }
    // --------------------------------

    const handleChange = (e)=>{
        console.log(e.target.value);
        setrole(e.target.value)
    }

    const handleSubmit = async(e)=>{
        try {
            let data=formdata
            const response =  await axios.post('http://localhost:4000/register/newuser',data)
       navigate('/signin')
            
        } catch (error) {
            
        }
        console.log(formdata,'formdata');
    }

    const handleNext = ()=>{
        if (formdata.role === "") {
            alert("Please select a user type (Citizen or Company).");
            return; // Prevent further processing if no user type is selected
          } 
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
                    <input type="text" name="username" id="" placeholder="Enter your Username" value={formdata.username} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Email</b>
                    <input type="email" name="email" id="" placeholder="Enter your Email ID" value={formdata.email} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Password</b>
                    <input type="password" name="password" id="" placeholder="Enter your Password" value={formdata.password} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Confirm Password</b>
                    <input type="password" name="confirmpass" id="" placeholder="Confirm your Password" onChange={handleChangeEvent} value={formdata.confirmpass} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">User Type</b>
                    <div className="flex gap-10">
                        <div><input type="radio" onChange={handleChangeEvent}  name="role" id="role" value={"citizen"} className="w-6 h-6" /> <b className="text-[20px] self-start">Citizen</b></div>
                        <div><input type="radio" onChange={handleChangeEvent}  name="role" id="role" value={"company"} className="w-6 h-6" /> <b className="text-[20px] self-start">Company</b></div>
                    </div>
                    <button className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 pl-5 pr-5 self-center" onClick={handleNext}><Link>Next</Link></button><br />



                </div>}
                { formdata.role === 'citizen' && next === false && <SignUpPage2Citizen handleChangeEvent={handleChangeEvent} formdata={formdata}  handleSubmit={handleSubmit} />}
                { formdata.role === 'company' && next === false && <SignUpPage2Company handleChangeEvent={handleChangeEvent} formdata={formdata}  handleSubmit={handleSubmit}/>}
                    <br />
            </div>
        </div>
    )
}
export default SignUpPage1