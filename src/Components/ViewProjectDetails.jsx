import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewProjectDetails() {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null); // Initialize to null

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/projects/viewProject/${id}`);
                const projectData = response.data.result;
                setProjectDetails(projectData);
            } catch (error) {
                console.error('Error fetching Project data:', error);
                // Optionally, set some state to indicate error to the user
            }
        };

        fetchProjectDetails();
    }, [id]);

    // Render loading or error state if projectDetails is null or undefined
    if (!projectDetails) {
        return <div>Loading...</div>; // Or some loading indicator
    }

    return (
        <div>
            <div className="flex flex-row">
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-3/4 h-[50vh] text-2xl overflow-scroll">
                    <b className="pl-3">Project Name: {projectDetails.projectName}</b><br /><br />
                    <b className="pl-3">Initiated by: {projectDetails.initiator}</b><br /><br />
                    <b className="pl-3">Company Working: {projectDetails.companyName}</b><br /><br />
                    <b className="pl-3">Budget of Project: &#8377; {projectDetails.budget}</b><br /><br />

                </div>
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-1/4 h-[50vh]"></div>
            </div>
            <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-[97.2%] h-[100vh]">
                <div className="text-lg">
                    <b className="pl-3">Project Details: </b><br />
                    <p className="p-3">{projectDetails.projectDescription}</p>
                </div>
            </div>
        </div>
    );
}

export default ViewProjectDetails;
