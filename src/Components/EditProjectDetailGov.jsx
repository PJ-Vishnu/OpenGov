import React, { useEffect, useState } from "react";
import axios from "axios";
import { successToast, errorToast } from "../Toast";
import { useParams } from "react-router-dom";

function EditProjectDetailGov() {
    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
        type: "",
        budget: "",
        tenderingLastDate: "",
        projectEndDate: "",
        location: "",
        locationMapURL: ""
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/projects/updateProject/${id}`);
                const projectData = response.data.result;
                setFormData(projectData);
            } catch (error) {
                console.error('Error fetching Project data:', error);
            }
        };

        fetchProjectData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/projects/updateProject/${id}`, formData);
            console.log('Project details updated successfully:', response.data);
            successToast(response.data.message)
            // Redirect or show success message
        } catch (error) {
            console.error('Error updating Project details:', error);
            // Handle error
        }
    };

    return (
        <div>
            <div className="justify-center flex flex-col">
                <div className="text-center flex flex-col w-11/12 h-[100vh] self-center">
                    <br />
                    <b className=" self-start pl-">Project Name:</b>
                    <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3"
                    /><br />
                    <b className=" self-start pl-">Project Description:</b>
                    <textarea name="project_description" value={formData.projectDescription} onChange={handleChange} id="" cols="30" rows="10" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 "></textarea><br />
                    <b className=" self-start pl-">Project Type:</b>
                    <select name="type" value={formData.type} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-1/4self-center rounded-[20px] pl-3 ">
                        <option value="Road">Road</option>
                        <option value="Building">Building</option>
                        <option value="Bridge">Bridge</option>
                        <option value="Repair">Repair</option>
                        <option value="Maintenence">Maintenence</option>
                        <option value="Fencing">Fencing</option>
                        <option value="Others">Others</option>
                    </select><br />
                    <b className=" self-start pl-">Budget:</b>
                    <input type="number" name="budget" value={formData.budget} onChange={(e) => setBudget(e.target.value)} id="" className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3" /><br />
                    <b className="self-start pl-">Tendering Last Date:</b>
                    <input
                        type="date"
                        name="tenderingLastDate"
                        value={formData.tenderingLastDate ? new Date(formData.tenderingLastDate).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        id="" 
                        className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3"
                    />
                    <br />
                    <b className="self-start pl-">Project End Date:</b>
                    <input
                        type="date"
                        name="projectEndDate"
                        value={formData.projectEndDate ? new Date(formData.projectEndDate).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        id=""
                        className="border-[2px] border-[rgb(33,51,97)] w-full h-10 self-center rounded-[20px] pl-3 pr-3"
                    />
                    <b className=" self-start pl-">Location:</b>
                    <input type="text" name="project_location" value={formData.location} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <b className=" self-start pl-">Location Map Url:</b>
                    <input type="text" name="project_location_url" value={formData.locationMapURL} onChange={handleChange} id="" className="border-[2px] border-[rgb(33,51,97)] w-full self-center rounded-[20px] pl-3" /><br />
                    <br />
                    <button onClick={handleSubmit} className=" bg-[rgb(33,51,97)] w-fit p-3 self-center rounded-full text-white">
                        <b>Edit Project</b>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default EditProjectDetailGov