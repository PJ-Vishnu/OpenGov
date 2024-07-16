import { Link, useParams } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, Cell, Label, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

function ViewOurProjectDetails() {

    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null); // Initialize to null
    const [expenses, setExpenses] = useState([]);
    const [expensesArray, setExpensesArray] = useState([]);
    const [resourceDetails, setResourceDetails] = useState([]);
    const [remainingBudget, setRemainingBudget] = useState(0);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/contracts/viewProjectCompany/${id}`);

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
                const { expenseArray, remainingProjectBudget, resourceDetails, expenses } = response.data;
                setExpenses(expenses)
                setExpensesArray(expenseArray);
                setRemainingBudget(remainingProjectBudget);
                setResourceDetails(resourceDetails)
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

    // Piechart calculation
    const proposedBudget = parseFloat(projectDetails.proposedBudget);
    const totalExpense = proposedBudget - parseFloat(remainingBudget);
    const expensePercentage = (totalExpense / proposedBudget * 100).toFixed(2);

    const completionPercentagePie = [
        {
            name: 'Estimate Budget',
            value: proposedBudget
        },
        {
            name: 'Total Expense',
            value: totalExpense,
        }
    ];
    const colors = ['#0088FE', '#FF8042'];

    // Prepare data for horizontal stacked bar chart
    const resourceData = projectDetails.tenderEstimate.map(item => ({
        name: item.name,
        used: expensesArray.find(expense => expense.name === item.name) ? expensesArray.find(expense => expense.name === item.name).amount : 0,
        Remaining: (parseFloat(item.amount) - (expensesArray.find(expense => expense.name === item.name) ? expensesArray.find(expense => expense.name === item.name).amount : 0)),
        Budget: parseFloat(item.amount)
    }));

    // Prepare data for line charts
    const resourceLineChartData = [];
    for (const [resource, resourceExpenses] of Object.entries(resourceDetails)) {
        const data = resourceExpenses.map(expense => ({
            date: new Date(expense.date).toLocaleDateString(), // Format the date as needed
            amount: expense.amount
        }));
        resourceLineChartData.push({ resource, data });
    }


    return (
        <div className="">
            <div className="flex flex-row">
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-3/4 h-[50vh] text-2xl">
                    <b className="pl-3">Project Name: {projectDetails.projectName}</b><br /><br />
                    <b className="pl-3">Iitiated by: {projectDetails.initiator}</b><br /><br />
                    <b className="pl-3">Company Working: {projectDetails.companyName}</b><br /><br />
                    <b className="pl-3">Declatred Budget : &#8377; {projectDetails.budget}</b><br /><br />
                    <b className="pl-3">Estimated Budget : &#8377; {projectDetails.proposedBudget}</b><br /><br />

                </div>
                <div className="border-[2px] border-[#213361] rounded-[20px] m-4 w-1/4 h-[50vh] ">
                    <b className="m-3 top-5 text-[27px]">Project Completion</b>
                    <div className="self-center align-middle h-full flex">
                        {/*Completion Pie chart*/}
                        <PieChart height={400} width={400} className="flex p-3 self-stretch align-middle">
                            <Tooltip />
                            <Pie data={completionPercentagePie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} >
                                <Label value={`${expensePercentage}%`} position="center" fill="white" fontSize={36} />
                                {completionPercentagePie.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>

                    </div>
                </div>
            </div>
            <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-[97.2%]  h-[100vh] overflow-scroll">
                <b className="m-3 top-5">Updated Resources</b>
                <table className="min-w-full divide-y divide-gray-200 m-3 border-2 ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {expensesArray.map((expense, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{expense.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{expense.units}</td>
                                <td className="px-6 py-4 whitespace-nowrap">&#8377; {expense.amount}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold">Remaining Budget</td>
                            <td className="px-6 py-4 whitespace-nowrap"></td>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold">&#8377; {remainingBudget}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold"></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <div className="m-4">
                    <b>Resource Usage</b>
                    <BarChart width={800} height={400} data={resourceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip
                            payload={[{ name: 'Budget', color: '#1100ff' }]} // Add this line
                        />
                        <Legend />
                        <Bar dataKey="Remaining" stackId="a" fill="#6595ed" />
                        <Bar dataKey="used" stackId="a" fill="#ff6050" />
                        <Bar dataKey="Budget" stackId="a" fill="#1100ff" opacity={0} />
                    </BarChart>
                </div>
                <div>
                    <b className="m-3">Resource Expenses Over Time</b>
                    {resourceLineChartData.map((data, index) => (
                        <div key={index}>
                            <br />
                            <b className="m-3 text-lg underline">{data.resource}</b>
                            <LineChart width={800} height={300} data={data.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" reversed={true} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={3} />
                            </LineChart>
                            <br />
                        </div>
                    ))}
                </div>
                <b className="m-3">Project Expense Recipts</b>
                <div>
                    <table className="min-w-full divide-y divide-gray-200 m-3 border-2">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Download Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {expenses.map((expense, index) => {
                                const dateParts = expense.date.split('T');
                                const date = dateParts[0];
                                const timeParts = dateParts[1].split(':');
                                const hours = parseInt(timeParts[0], 10);
                                const minutes = parseInt(timeParts[1], 10);
                                const amOrPm = hours >= 12 ? 'PM' : 'AM';
                                const formattedHours = hours % 12 || 12;
                                const formattedMinutes = minutes.toString().padStart(2, '0');

                                return (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{date}</td> {/* Date column */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{`${formattedHours}:${formattedMinutes} ${amOrPm}`}</td> {/* Time column */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {expense.receiptFile ? (
                                                <button onClick={() => window.open(`http://localhost:4000/${expense.receiptFile}`, '_blank')}>
                                                    Download Receipt
                                                </button>
                                            ) : (
                                                <span>No receipt available</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>


                </div>
            </div>
            {/* <Link to={"requestfunds"}>
                <div className="absolute right-9 flex flex-col justify-center items-center    bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <GiReceiveMoney color="#213361" size={30} />
                    Request Funds
                </div>
            </Link> */}
            <Link to={"updateproject"}>
                <div className="absolute right-9 flex flex-col justify-center items-center    bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <GrUpdate color="#213361" size={30} />
                    Update Data
                </div>
            </Link>
        </div >
    )
}
export default ViewOurProjectDetails