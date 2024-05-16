import { Link, useParams } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";

function ViewOurProjectDetails() {

    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null); // Initialize to null
    const [expenses, setExpenses] = useState([]);
    const [remainingBudget, setRemainingBudget] = useState(0);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/contracts/viewProject/${id}`);
                
                const projectData = response.data.result;
                setProjectDetails(projectData);
            } catch (error) {
                console.error('Error fetching Project data:', error);
                // Optionally, set some state to indicate error to the user
            }
        };

        fetchProjectDetails();
    }, [id]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/expenses/getExpenses/${id}`);
                const { expenseArray, remainingProjectBudget } = response.data;
                setExpenses(expenseArray);
                setRemainingBudget(remainingProjectBudget);
            } catch (error) {
                console.error('Error fetching Expenses:', error);
            }
        };

        fetchExpenses();
    }, [id]);

    // Render loading or error state if projectDetails is null or undefined
    if (!projectDetails) {
        return <div>Loading...</div>; // Or some loading indicator
    }


    return (
        <div>
            <div className="flex flex-row">
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-3/4 h-[50vh] text-2xl">
                    <b className="pl-3">Project Name: {projectDetails.projectName}</b><br /><br />
                    <b className="pl-3">Iitiated by: {projectDetails.initiator}</b><br /><br />
                    <b className="pl-3">Company Working: {projectDetails.companyName}</b><br /><br />
                    <b className="pl-3">Declatred Budget : &#8377; {projectDetails.budget}</b><br /><br />
                    <b className="pl-3">Estimated Budget : &#8377; {projectDetails.proposedBudget}</b><br /><br />

                </div>
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-1/4 h-[50vh]">

                </div>
            </div>
            <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-[97.2%] h-[100vh]">
                <b className="m-3 top-5">Updated Resources</b>
            <table className="w-fit divide-y divide-gray-200 m-3 border-2 ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{expense.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{expense.units}</td>
                                <td className="px-6 py-4 whitespace-nowrap">&#8377; {expense.amount}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold">Remaining Budget</td>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold">&#8377; {remainingBudget}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Link to={"requestfunds"}>
                <div className="absolute right-9 flex flex-col justify-center items-center    bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <GiReceiveMoney color="#213361" size={30} />
                    Request Funds
                </div>
            </Link>
            <Link to={"updateproject"}>
                <div className="absolute right-52 flex flex-col justify-center items-center    bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <GrUpdate color="#213361" size={30} />
                    Update Data
                </div>
            </Link>
        </div>
    )
}
export default ViewOurProjectDetails