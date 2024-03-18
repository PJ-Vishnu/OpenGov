function SignUpPage2Citizen() {
    return (
        <div className="flex flex-col w-11/12">
            <br />
            <b className="text-[20px] self-start">Profile Picture</b>
            <input type="file" src="" alt="Choose Image" className="h-[15vh] w-[15vh] self-center text-center" />
            <br />
            <b className="text-[20px] self-start">Date of Birth</b>
            <input type="date" name="" id="" placeholder="Enter your D.O.B" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
            <br />
            <b className="text-[20px] self-start">Phone</b>
            <input type="text" name="" id="" placeholder="Enter your Phone Number" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
            <br />
            <b className="text-[20px] self-start">Address</b>
            <textarea name="address" id="" cols="30" rows="10" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
            <br />
            <b className="text-[20px] self-start">Gender</b>
            <div className="flex gap-10">
                <div><input type="radio" name="gender" id="gender" value={"male"} className="text-[20px] " /> <b className="text-[20px] self-start">Male</b></div>
                <div><input type="radio" name="gender" id="gender" value={"female"} className="text-[20px] " /> <b className="text-[20px] self-start">Female</b></div>
                <div><input type="radio" name="gender" id="gender" value={"others"} className="text-[20px] " /> <b className="text-[20px] self-start">Others</b></div>
            </div>
        </div>
    )
}
export default SignUpPage2Citizen