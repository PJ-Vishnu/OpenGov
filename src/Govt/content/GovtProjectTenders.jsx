import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { successToast, errorToast } from '../../Toast';
import { GrSort } from 'react-icons/gr';
import { FiFilter } from 'react-icons/fi';
import { useSearch } from '../../Components/SearchContext';

function GovtProjectTenders() {
    const { id } = useParams();

    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("");
    const { searchTerm } = useSearch();

    useEffect(() => {
    const fetchTenders = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/tenders/projectTenders/${id}`);
            console.log('Response data:', response.data); // Check the data returned from the server
            
            let filteredTenders = response.data.data;
            
            // Apply filter based on searchTerm if it exists
            if (searchTerm) {
                filteredTenders = filteredTenders.filter(tender =>
                    tender.tenderName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setTenders(filteredTenders); // Set tenders to the array of tenders after filtering
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tenders:', error);
            setLoading(false);
            errorToast('No tenders Found');
        }
    };

    fetchTenders();
}, [id, searchTerm]);

console.log('Tenders:', tenders);


    const handleDelete = async (tenderId) => {
        console.log("Deleting tender with ID:", tenderId);
        try {
            await axios.delete(`http://localhost:4000/tenders/deleteTender/${tenderId}`);
            // Remove the deleted tender from the state
            setTenders(tenders.filter(tender => tender._id !== tenderId));
            successToast("Tender deleted successfully");
        } catch (error) {
            console.error('Error deleting tender:', error);
            errorToast("Failed to delete tender");
        }
    };
    
    const handleApprove = async (tenderId) => {
        console.log("Approving tender with ID:", tenderId);
        try {
            const response = await axios.post(`http://localhost:4000/contracts/approveTender/${tenderId}`);
            successToast(response.data.message);
        } catch (error) {
            console.error('Error Approving tender:', error);
            if (error.response && error.response.data && error.response.data.message) {
                errorToast(error.response.data.message);
            } else {
                errorToast('An error occurred while approving the tender.');
            }
        }
    };
    // Function to format date without time
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const sortData = (criteria) => {
        // Update sortBy state
        setSortBy(criteria);
        // Sort data based on criteria
        const sortedData = [...data].sort((a, b) => {
            if (criteria === "projectId") {
                return a.projectId.localeCompare(b.projectId);
            } else if (criteria === "projectName") {
                return a.projectName.localeCompare(b.projectName);
            } else if (criteria === "budget") {
                return a.budget - b.budget;
            }
            return 0;
        });
        setData(sortedData);
    };

    return (
        <div>
            <div className="">
                <div className="w-[98.2%] h-fit flex gap-9 p-3 m-3 border-[3px] border-[#213361] justify-center text-white">
                <select
                    className="bg-[#313361] p-2 pl-3 pr-3 flex items-center"
                    onChange={(e) => sortData(e.target.value)}
                    value={sortBy}
                >
                    <option value="">Sort By</option>
                    <option value="projectName">Project Name</option>
                    <option value="budget">Budget</option>
                    <option value="id">ID</option>
                </select>
                </div>
                <table className="border-collapse font-sans w-[98.2%] m-3">
                    <thead>
                        <tr className="font-bold text-[#213361]">
                            <th className="border pt-3 pb-3">Tender ID</th>
                            <th className="border pt-3 pb-3">Project ID</th>
                            <th className="border pt-3 pb-3">Project Name</th>
                            <th className="border pt-3 pb-3">Location</th>
                            <th className="border pt-3 pb-3">Budget</th>
                            <th className="border pt-3 pb-3">Company</th>
                            <th className="border pt-3 pb-3">Tendering Date</th>
                            <th className="border pt-3 pb-3">View/Approve/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="text-center">Loading...</td>
                            </tr>
                        ) : tenders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center">No tenders found.</td>
                            </tr>
                        ) : (
                            tenders.map(tender => (
                                <tr key={tender?._id} className="text-center">
                                    <td className="border p-3">{tender._id}</td>
                                    <td className="border p-3">{tender?.projectId}</td>
                                    <td className="border p-3">{tender?.projectName}</td>
                                    <td className="border p-3">{tender?.location}</td>
                                    <td className="border p-3">{tender?.budget}</td>
                                    <td className="border p-3">{tender?.companyName}</td>
                                    <td className="border p-3">{formatDate(tender?.tenderingDate)}</td>
                                    <td className="border p-3">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                            <Link to={`/govt/tendering/project/tenderdetails/${tender?._id}`}>
                                                <GrView color="#213361" size={25} />
                                            </Link>
                                            <FaRegCheckCircle color="green" size={25} onClick={() => handleApprove(tender._id)}/>
                                            <MdDeleteOutline
                                                onClick={() => handleDelete(tender._id)}
                                                className="cursor-pointer"
                                                color="#ff6060"
                                                size={25}
                                            />

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GovtProjectTenders;
