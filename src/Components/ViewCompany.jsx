import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewCompany() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchCompany();
    }, [id]);

    const fetchCompany = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/register/getOneCompany/${id}`);
            const response2 = await axios.get(`http://localhost:4000/contracts/ourProjects/${id}`);
            setData(response?.data?.result);
            setProjects(response2.data.result);
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    };

    return (
        <div>
            <div className="flex flex-row">
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-full h-[50vh] text-2xl">
                    <b className="pl-3">User Name: {data.username}</b><br /><br />
                    <b className="pl-3">Phone: {data.phone}</b><br /><br />
                    <b className="pl-3">Address: {data.address}</b><br /><br />
                    <b className="pl-3">Organization: {data.organisationName}</b><br /><br />
                </div>
            </div>
            <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-[97.2%] h-[100vh]">
                <b className="pl-3">Company Projects</b><br /><br />
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Project ID</th>
                            <th className="border px-4 py-2">Project Name</th>
                            <th className="border px-4 py-2">Budget</th>
                            <th className="border px-4 py-2">Proposed Budget</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id}>
                                <td className="border px-4 py-2 text-center">{project.projectId}</td>
                                <td className="border px-4 py-2 text-center">{project.projectName}</td>
                                <td className="border px-4 py-2 text-center">{project.budget}</td>
                                <td className="border px-4 py-2 text-center">{project.proposedBudget}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewCompany;
