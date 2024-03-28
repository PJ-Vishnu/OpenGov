function CreateProjectGov() {
    return (
        <div>
            <div className="justify-center flex flex-col">
                <div className="text-center flex flex-col w-11/12 h-[100vh] self-center">
                    <br />
                    <b className="text-center text-2xl">Create new Project</b><br />
                    <hr className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-full   " /><br />
                    <b className=" self-start pl-">Project Name:</b>
                    <input type="text" name="project_name" id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <b className=" self-start pl-">Project Description:</b>
                    <textarea name="project_description" id="" cols="30" rows="10" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 "></textarea><br />
                    <b className=" self-start pl-">Project Type:</b>
                    <select name="project_type" id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 ">
                        <option value="Road">Road</option>
                        <option value="Building">Building</option>
                        <option value="Bridge">Bridge</option>
                        <option value="Repair">Repair</option>
                        <option value="Maintenence">Maintenence</option>
                        <option value="Fencing">Fencing</option>
                        <option value="Others">Others</option>
                    </select><br />
                    <b className=" self-start pl-">Location:</b>
                    <input type="text" name="project_location" id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <b className=" self-start pl-">Location Map Url:</b>
                    <input type="url" name="project_location_url" id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <br />
                    <div className=" bg-[rgb(33,51,97)] w-fit p-3 self-center rounded-full">
                        <b>Create Project</b>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateProjectGov