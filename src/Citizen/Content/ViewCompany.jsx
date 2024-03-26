function ViewCompany() {
    return (
        <div>
            <div>
                <div className="flex flex-row">
                    <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-3/4 h-[50vh] text-2xl">
                        <b className="pl-3">Company Name: Name</b><br /><br />
                        <b className="pl-3">Level of Projects</b><br /><br />
                        <b className="pl-3">Current Project: Project</b><br /><br />
                        <b className="pl-3">Budget of Project: &#8377; 10,00,000</b><br /><br />

                    </div>
                    <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-1/4 h-[50vh]">
                        <b className="pl-3">Progress of Active Projects</b><br /><br />
                    </div>
                </div>
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-[97.2%] h-[100vh]">
                <b className="pl-3">Past Project Details or List</b><br /><br />
                </div>
            </div>
        </div>
    )
}
export default ViewCompany