function EditCitizenP2({ handleChangeEvent, formdata, handleSubmit }) {
    return (
        <div className="flex flex-col w-11/12">
            <br />
            <label htmlFor="avatar" className="text-[20px] self-start">Profile Picture</label>
            {/* <input type="file" name="avatar" src="" alt="Choose Image" value={formdata.avatar} onChange={handleChangeEvent} className="h-[15vh] w-[15vh] self-center text-center" /> */}
            <br />
            <label htmlFor="dob" className="text-[20px] self-start">Date of Birth</label>
            <input type="date" name="dob" id="dob" placeholder="Enter your D.O.B" value={formdata.dob} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
            <br />
            <label htmlFor="phone" className="text-[20px] self-start">Phone</label>
            <input type="text" name="phone" id="phone" placeholder="Enter your Phone Number" value={formdata.phone} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
            <br />
            <label htmlFor="address" className="text-[20px] self-start">Address</label>
            <textarea name="address" id="address" cols="30" rows="10" placeholder="Enter your Home Address" value={formdata.address} onChange={handleChangeEvent} className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
            <br />
            <label className="text-[20px] self-start">Gender</label>
            <div className="flex gap-10">
                <div><input type="radio" name="gender" id="male" value="male" onChange={handleChangeEvent} className="text-[20px]" /> <label htmlFor="male" className="text-[20px] self-start">Male</label></div>
                <div><input type="radio" name="gender" id="female" value="female" onChange={handleChangeEvent} className="text-[20px]" /> <label htmlFor="female" className="text-[20px] self-start">Female</label></div>
                <div><input type="radio" name="gender" id="others" value="others" onChange={handleChangeEvent} className="text-[20px]" /> <label htmlFor="others" className="text-[20px] self-start">Others</label></div>
            </div>
            <button onClick={handleSubmit} className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 pl-5 pr-5 self-center">Update</button>
        </div>
    );
}

export default EditCitizenP2;
