import { useState } from "react"

function SignUpPage2Citizen({handleChangeEvent,formdata,handleSubmit}) {

    

    const handleChange = (e)=>{
        setGender(e.target.value)
    }

    


    return (
        <div className="flex flex-col w-11/12">
            <br />
            <b className="text-[20px] self-start">Profile Picture</b>
            <input type="file" name="avatar" src="" alt="Choose Image" value={formdata.avatar} onChange={handleChangeEvent} className="h-[15vh] w-[15vh] self-center text-center" />
            <br />
            <b className="text-[20px] self-start">Date of Birth</b>
            <input type="date" name="dob" id="" placeholder="Enter your D.O.B" value={formdata.dob} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
            <br />
            <b className="text-[20px] self-start">Phone</b>
            <input type="text" name="phone" id="" placeholder="Enter your Phone Number" value={formdata.phone} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
            <br />
            <b className="text-[20px] self-start">Address</b>
            <textarea name="address" id="" cols="30" rows="10" placeholder="Enter your Home Address" value={formdata.address} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
            <br />
            <b className="text-[20px] self-start">Gender</b>
            <div className="flex gap-10">
                <div><input type="radio" name="gender" id="gender" value={"male"} onChange={handleChangeEvent} className="text-[20px] " /> <b className="text-[20px] self-start">Male</b></div>
                <div><input type="radio" name="gender" id="gender" value={"female"} onChange={handleChangeEvent} className="text-[20px] " /> <b className="text-[20px] self-start">Female</b></div>
                <div><input type="radio" name="gender" id="gender" value={"others"} onChange={handleChangeEvent} className="text-[20px] " /> <b className="text-[20px] self-start">Others</b></div>
            </div>
            <button onClick={handleSubmit} className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 pl-5 pr-5 self-center">Sign Up</button>
        </div>
    )
}
export default SignUpPage2Citizen