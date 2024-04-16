import { useState } from "react"
import axios from 'axios'
import { successToast, errorToast } from "../Toast"



function CreateProjectGov() {
    const [projectName, setProjectName] = new useState()
    const [projectDescription, setProjectDescription] = new useState()
    const [type, setProjectType] = new useState()
    const [budget,setBudget] = new useState()
    const [tenderingLastDate, setTenderingDate] = new useState()
    const [projectEndDate, setProjectEndDate] = new useState()
    const [location, setLocation] = new useState()
    const [locationMapURL, setLocationMapURL] = new useState()

    const handlerSubmit = async (e) => {
        e.preventDefault()
        try {
            let data = {
                projectName,
                projectDescription,
                type,
                budget,
                tenderingLastDate,
                projectEndDate,
                location,
                locationMapURL
            }
            console.log(data);
            const response = await axios.post('http://localhost:4000/projects/newproject', data)
            successToast(response.data.message)

        } catch (error) {
            errorToast(error.response.data.message || 'error')
        }
    }

    return (
        <div>
            <div className="justify-center flex flex-col">
                <form onSubmit={handlerSubmit} className="text-center flex flex-col w-11/12 h-[100vh] self-center">
                    <br />
                    <b className="text-center text-2xl">Create new Project</b><br />
                    <hr className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-full   " /><br />
                    <b className=" self-start pl-">Project Name:</b>
                    <input type="text" name="project_name" value={projectName} onChange={(e) => setProjectName(e.target.value)} id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <b className=" self-start pl-">Project Description:</b>
                    <textarea name="project_description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} id="" cols="30" rows="10" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 "></textarea><br />
                    <b className=" self-start pl-">Project Type:</b>
                    <select name="type"  onChange={(e) => setProjectType(e.target.value)} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 ">
                        <option value="Road">Road</option>
                        <option value="Building">Building</option>
                        <option value="Bridge">Bridge</option>
                        <option value="Repair">Repair</option>
                        <option value="Maintenence">Maintenence</option>
                        <option value="Fencing">Fencing</option>
                        <option value="Others">Others</option>
                    </select><br />
                    <b className=" self-start pl-">Budget:</b>
                    <input type="number" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3" /><br />
                    <b className=" self-start pl-">Tendering Last Date:</b>
                    <input type="date" name="tenderingDate" value={tenderingLastDate} onChange={(e) => setTenderingDate(e.target.value)} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3" /><br />
                    <b className=" self-start pl-">Project End Date:</b>
                    <input type="date" name="projectEndDate" value={projectEndDate} onChange={(e) => setProjectEndDate(e.target.value)} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3" /><br />
                    <b className=" self-start pl-">Location:</b>
                    <input type="text" name="project_location" value={location} onChange={(e) => setLocation(e.target.value)} id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <b className=" self-start pl-">Location Map Url:</b>
                    <input type="text" name="project_location_url" value={locationMapURL} onChange={(e) => setLocationMapURL(e.target.value)} id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <br />
                    <button type="submit" className=" bg-[rgb(33,51,97)] w-fit p-3 self-center rounded-full text-white">
                        <b>Create Project</b>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default CreateProjectGov