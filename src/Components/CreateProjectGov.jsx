import React, { useEffect, useState } from "react";
import axios from "axios";
import { successToast, errorToast } from "../Toast";

function CreateProjectGov() {
    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
        type: "",
        budget: "",
        tenderingLastDate: "",
        projectEndDate: "",
        location: "",
        locationMapURL: "",
    }); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        const level = localStorage.getItem('level');
        setFormData(prevFormData => ({ ...prevFormData, initiator: level }));
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4000/projects/newProject",
                formData
            );
            successToast(response.data.message);
        } catch (error) {
            errorToast(error.response.data.message || "Error");
        }
    };

    return (
        <div>
            <div className="justify-center flex flex-col">
                <form
                    onSubmit={handleSubmit}
                    className="text-center flex flex-col w-11/12 h-[100vh] self-center"
                >
                    <br />
                    <b className="text-center text-2xl">Create new Project</b><br />
                    <hr className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-full" /><br />
                    <b className=" self-start pl-">Project Name:</b>
                    <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3"
                    /><br />
                    <b className=" self-start pl-">Project Description:</b>
                    <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} id="" cols="30" rows="10" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 "></textarea><br />
                    <b className=" self-start pl-">Project Type:</b>
                    <select name="type" value={formData.type} onLoad={handleChange} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 ">
                        <option value="Road">Road</option>
                        <option value="Building">Building</option>
                        <option value="Bridge">Bridge</option>
                        <option value="Repair">Repair</option>
                        <option value="Maintenence">Maintenence</option>
                        <option value="Fencing">Fencing</option>
                        <option value="Others">Others</option>
                    </select><br />
                    <b className=" self-start pl-">Budget:</b>
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3" /><br />
                    <b className=" self-start pl-">Tendering Last Date:</b>
                    <input type="date" name="tenderingLastDate" value={formData.tenderingLastDate} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3" /><br />
                    <b className=" self-start pl-">Project End Date:</b>
                    <input type="date" name="projectEndDate" value={formData.projectEndDate} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3" /><br />
                    <b className=" self-start pl-">Location:</b>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <b className=" self-start pl-">Location Map Url:</b>
                    <input type="text" name="locationMapURL" value={formData.locationMapURL} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
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