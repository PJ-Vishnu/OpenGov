function EditProjectDetailGov() {
    return (
        <div>
            <div className="justify-center flex flex-col">
                <div className="text-center flex flex-col w-11/12 h-[100vh] self-center">
                    <br />
                    <b className="text-center text-2xl">Edit Project Details</b><br />
                    <hr className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-full   " /><br />
                    <b className=" self-start pl-">Project Name:</b>
                    <input type="text" name="project_name" id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <b className=" self-start pl-">Project Description:</b>
                    <textarea name="project_description" id="" cols="30" rows="10" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 "></textarea><br />
                    <b className=" self-start pl-">Location:</b>
                    <input type="text" name="project_location" id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <b className=" self-start pl-">Location Map Url:</b>
                    <input type="url" name="project_location_url" id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <br />
                    <div className=" bg-[rgb(33,51,97)] w-fit p-3 self-center rounded-full">
                        <b>Edit Project</b>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditProjectDetailGov