import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { useParams } from 'react-router-dom';

function ViewTenderDetails() {
    const { id } = useParams(); // Extracting the 'id' parameter from the URL
    const [tenderData, setTenderData] = useState(null);

    useEffect(() => {
        // Fetch data from MongoDB when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/tenders/tenderDetails/${id}`);
                setTenderData(response.data);
            } catch (error) {
                console.error('Error fetching tender data:', error);
            }
        };

        fetchData();
    }, [id]); // Add 'id' as a dependency to re-fetch data when 'id' changes

    return (
        <div>
            {tenderData ? (
                <div>
                    <div className="flex flex-row">
                        <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-3/4 h-[50vh] text-2xl">
                            <b className="pl-3">Project ID: {tenderData.projectId}</b><br /><br />
                            <b className="pl-3">Company ID: {tenderData.companyId}</b><br /><br />
                            <b className="pl-3">Request Letter: </b><br />
                            <p className='p-3'>{tenderData.requestLetter}</p>
                            <br /><br />
                            
                        </div>
                        <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-1/4 h-[50vh]">
                            {/* Placeholder content */}
                            <p className="text-center text-gray-600 mt-10">Additional Information</p>
                        </div>
                    </div>
                    <div className="border-[2px] border-[#213361] rounded-[20px] m-5  h-[100vh] p-3">
                        {/* Placeholder content */}
                        <b className="">Tender Estimate:</b><br /><br />
                            {tenderData.tenderEstimate.map((estimate, index) => (
                                <div key={index}>
                                    <p>Name: {estimate.name}</p>
                                    <p>Amount: {estimate.amount}</p><br />
                                    <p>Total Budget: {estimate.totalBudget}</p>
                                </div>
                            ))}
                        <ul>
                            {/* Add resources and specifications here */}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ViewTenderDetails;
