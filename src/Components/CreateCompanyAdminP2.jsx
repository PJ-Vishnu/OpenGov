function CreateCompanyAdminP2() {
    return (
                <div className="flex flex-col w-11/12">
                    <br />
                    <b className="text-[20px] self-start">Profile Picture</b>
                    <input type="file" src="" alt="Choose Image" className="h-[15vh] w-[15vh] self-center text-center"/>
                    <br />
                    <b className="text-[20px] self-start">Organisation Name</b>
                    <input type="text" name="" id="" placeholder="Enter the Organisation Name" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Details</b>
                    <textarea name="company_details" id="" cols="30" rows="10" placeholder="Enter Company Details" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                    <br />
                    <b className="text-[20px] self-start">Phone</b>
                    <input type="text" name="" id="" placeholder="Enter your Phone Number" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                    <br />
                    <b className="text-[20px] self-start">Address</b>
                    <textarea name="address" id="" cols="30" rows="10" placeholder="Enter Address of Head Office" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                    <br />
                </div>
    )
}
export default CreateCompanyAdminP2