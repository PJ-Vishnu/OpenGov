import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewTenderingProjectDetails() {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/projects/viewProject/${id}`);
                setProjectDetails(response.data.result);
            } catch (error) {
                console.error('Error fetching Project data:', error);
                // Optionally, set some state to indicate error to the user
            }
        };
        
        console.log('useeffect called')
        console.log(projectDetails);
        fetchProjectDetails();
    }, [id]);


    return (
        <div>
            <div className="flex flex-row">
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-full h-[50vh] text-xl">
                    {/* Access project name */}
                    <b className="pl-3">Project Name: </b>{projectDetails && projectDetails.projectName}<br /><br />
                    {/* Access initiator */}
                    <b className="pl-3">Initiated by: </b>{projectDetails && projectDetails.initiator}<br /><br />
                    {/* Access status */}
                    <b className="pl-3">Status: </b>{projectDetails && projectDetails.status}<br /><br />
                    {/* Access budget */}
                    <b className="pl-3">Budget: &#8377; </b>{projectDetails && projectDetails.budget}<br /><br />   
                    <b className="pl-3">Tendering Last Date: </b>{projectDetails && projectDetails.tenderingLastDate}<br /><br />
                    <b className="pl-3">location: </b>{projectDetails && projectDetails.location}<br /><br />
                    
                </div>
                {/* <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-1/4 h-[50vh]">
                    
                </div> */}
            </div>
            <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-[97.2%] h-[100vh] p-3">
                <b className="text-lg">
                    Project Description
                </b>
                {/* Access project description */}
                <p>
                    {projectDetails && projectDetails.projectDescription}
                </p>
            </div>
        </div>
    )
    
}
export default ViewTenderingProjectDetails;