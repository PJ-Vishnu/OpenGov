import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewCompany() {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        fetchCompany();
    }, [id]);

    const fetchCompany = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/register/getOneCompany/${id}`);
            setData(response?.data?.result);
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    };

    return (
        <div>
            <div className="flex flex-row">
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-3/4 h-[50vh] text-2xl">
                    <b className="pl-3">Company Name: {data.username}</b><br /><br />
                    <b className="pl-3">Level of Projects: {data.projectLevel}</b><br /><br />
                    <b className="pl-3">Current Project: {data.currentProject}</b><br /><br />
                    <b className="pl-3">Budget of Project: &#8377; {data.projectBudget}</b><br /><br />
                </div>
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-1/4 h-[50vh]">
                    <b className="pl-3">Progress of Active Projects</b><br /><br />
                </div>
            </div>
            <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-[97.2%] h-[100vh]">
                <b className="pl-3">Past Project Details or List</b><br /><br />
            </div>
        </div>
    );
}

export default ViewCompany;
