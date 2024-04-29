import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { successToast, errorToast } from '../../Toast';
import { GrSort } from 'react-icons/gr';
import { FiFilter } from 'react-icons/fi';

function GovtProjectTenders() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenders = async () => {
            try {
                const response = await axios.get('http://localhost:4000/tenders'); // Adjust the URL to your backend endpoint
                setTenders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tenders:', error);
                setLoading(false);
            }
        };

        fetchTenders();
    }, []);

    return (
        <div>
            <div className="">
                <div className="w-[98.2%] h-[20px] flex gap-9 p-3 m-3 border-[3px] border-[#213361] justify-center text-white">
                    <div className="bg-[#313361] p-2 pl-3 pr-3 flex ">
                        <GrSort size={25} className="pr-2" />Sort
                    </div>
                    <div className="bg-[#313361] p-2 pl-3 pr-3 flex">
                        <FiFilter size={25} className="pr-2" />Filter
                    </div>
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
                        ) : (
                            tenders.map(tender => (
                                <tr key={tender._id} className="text-center">
                                    <td className="border pt-3 pb-3">{tender.tenderId}</td>
                                    <td className="border pt-3 pb-3">{tender.projectId}</td>
                                    <td className="border pt-3 pb-3">{tender.projectName}</td>
                                    <td className="border pt-3 pb-3">{tender.location}</td>
                                    <td className="border pt-3 pb-3">{tender.budget}</td>
                                    <td className="border pt-3 pb-3">{tender.company}</td>
                                    <td className="border pt-3 pb-3">{tender.tenderingDate}</td>
                                    <td className="border pt-3 pb-3">
                                        <div className="flex align-middle w-full justify-center items-center gap-8">
                                            <Link to={`/tenderdetails/${tender._id}`}>
                                                <GrView color="#213361" size={25} />
                                            </Link>
                                            <FaRegCheckCircle color="green" size={25} />
                                            <MdDeleteOutline
                                                onClick={() => {
                                                    successToast("Hello");
                                                    errorToast("Error");
                                                }}
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
