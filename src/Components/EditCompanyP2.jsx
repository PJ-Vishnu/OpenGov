function EditCompanyP2({ handleChangeEvent, formdata, handleSubmit, imgPreview }) {
    return (
        <div className="flex flex-col w-11/12">
            <br />
            <b className="text-[20px] self-start">Profile Picture</b>
            <input type="file" name="avatar" onChange={handleChangeEvent} src="" alt="Choose Image" className="h-[15vh] w-[15vh] self-center text-center"/>
                   { formdata?.avatar &&  <img src={imgPreview?URL.createObjectURL(formdata?.avatar):`https://opengov-server.onrender.com/${formdata?.avatar}`} alt="" className="w-36 h-36 self-center" />
                   }                <br />
            <b className="text-[20px] self-start">Organisation Name</b>
            <input type="text" name="organisationName" value={formdata.organisationName} onChange={handleChangeEvent} id="" placeholder="Enter the Organisation Name" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
            <br />
            <b className="text-[20px] self-start">Details</b>
            <textarea name="organisationDetails" value={formdata.organisationData} onChange={handleChangeEvent} id="" cols="30" rows="10" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
            <br />
            <b className="text-[20px] self-start">Phone</b>
            <input type="text" name="phone" value={formdata.phone} onChange={handleChangeEvent} id="" placeholder="Enter your Phone Number" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
            <br />
            <b className="text-[20px] self-start">Address</b>
            <textarea name="address" value={formdata.address} onChange={handleChangeEvent} id="" cols="30" rows="10" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
            <br />
            <button onClick={handleSubmit} className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 pl-5 pr-5 self-center">Update</button>
        </div>
    )
}
export default EditCompanyP2