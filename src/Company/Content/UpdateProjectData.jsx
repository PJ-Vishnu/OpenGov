import { Link, useParams } from "react-router-dom";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import axios from "axios";
import { errorToast, successToast, warningToast } from "../../Toast";

function UpdateProjectData() {

    const { id } = useParams();

    const [dynamicForm, setDynamic] = useState([{ name: '', quantity: '', unitPrice: '', amount: '' }]);
    const [tenderEstimateOptions, setTenderEstimateOptions] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [progressReport, setProgressReport] = useState('');
    const [receiptFile, setReceiptFile] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/contracts/viewProject/${id}`)
                console.log(response.data.result)
                // Extract names from tender estimate and set as options for the dropdown
                if (response.data.result && response.data.result.tenderEstimate) {
                    const options = response.data.result.tenderEstimate.map(item => item.name);
                    setTenderEstimateOptions(options);
                }
            } catch (error) {
                console.error('Error fetching tender data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        let sum = 0;
        dynamicForm.forEach(item => {
            sum += parseFloat(item.amount);
        });
        setTotalExpense(sum);
    }, [dynamicForm]);

    const addDynamicForm = () => {
        const lastItem = dynamicForm[dynamicForm.length - 1];
        if (lastItem?.name !== '' && lastItem?.quantity !== '' && lastItem?.unitPrice !== '') {
            setDynamic([...dynamicForm, { name: '', quantity: '', unitPrice: '', amount: '' }]);
        }
        else {
            warningToast("Please fill the data first!");
        }
    };

    const deleteDynamicForm = (indexOf) => {
        const updatedForm = [...dynamicForm];
        updatedForm.splice(indexOf, 1);
        setDynamic(updatedForm);
    };

    const handleQuantityChange = (index, value) => {
        const updatedForm = [...dynamicForm];
        updatedForm[index].quantity = value;
        updatedForm[index].amount = value * updatedForm[index].unitPrice;
        setDynamic(updatedForm);
    };

    const handleUnitPriceChange = (index, value) => {
        const updatedForm = [...dynamicForm];
        updatedForm[index].unitPrice = value;
        updatedForm[index].amount = value * updatedForm[index].quantity;
        setDynamic(updatedForm);
    };

    const handleFileUpload = (event) => {
        setReceiptFile(event.target.files[0]);
    };

    const handleSend = () => {
        const expenseData = {
            contractId: id,
            progressReport: progressReport,
            updatedResources: dynamicForm,
            totalExpense: totalExpense,
            date: Date.now()
        };

        const formData = new FormData();
        formData.append('receiptFile', receiptFile);

        // Serialize the updatedResources array before appending it
        formData.append('updatedResources', JSON.stringify(expenseData.updatedResources));

        for (let key in expenseData) {
            if (key !== 'updatedResources') {
                formData.append(key, expenseData[key]);
            }
        }

        axios.post('http://localhost:4000/expenses/addExpense', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            successToast("Expense Updated successfully");
            console.log('Expense Updated successfully:', response);
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                errorToast(error.response.data.message);
            } else {
                errorToast("An error occurred while updating expense.");
            }
            console.error('Error Updating data:', error);
        });
    };

    const handleSelectChange = (index, value) => {
        const copy = [...dynamicForm];
        if (selectedOptions.includes(value)) {
            warningToast("This resource is already selected!");
        } else {
            copy[index].name = value;
            setSelectedOptions([...selectedOptions, value]);
            setDynamic(copy);
        }
    };

    const formui = dynamicForm.map((item, index) => {
        return (
            <div className="gap-2 flex m-3 items-center" key={index}>
                <select
                    value={item.name}
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border"
                >
                    <option value="">Select Name</option>
                    {tenderEstimateOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <input
                    value={item.quantity}
                    name="quantity"
                    placeholder="Quantity"
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    type="number"
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border"
                />
                <input
                    value={item.unitPrice}
                    name="unitPrice"
                    placeholder="Unit Price"
                    onChange={(e) => handleUnitPriceChange(index, e.target.value)}
                    type="number"
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border"
                />
                <MdOutlineCurrencyRupee size={25} />
                <input
                    value={item.amount}
                    name="amount"
                    placeholder="Amount Required in Rupees"
                    readOnly
                    type="number"
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border"
                />
                <IoMdRemove size={25} onClick={() => deleteDynamicForm(index)} />
            </div>
        );
    });

    return (
        <div>
            <div className="flex flex-col m-3">
                <b className="text-[36px]">Update Project Data</b><br />
                <hr />
                <b className="text-[20px] self-start">Contract ID</b>
                <input type="text" placeholder="Project ID" readOnly value={id} className="hover: border-none pointer-events-none"/>
                <br />

                <b className="text-[20px] self-start">Progress Report</b>
                <textarea name="progressReport" onChange={(e) => setProgressReport(e.target.value)} id="" cols="30" rows="10" placeholder="Write your report here" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                <br />  

                <b className="text-[20px] self-start">Update Expenditure</b>
                <div className="flex flex-col border-[2px] border-[#213361] rounded-lg w-full h-fit pl-3">
                    <br />
                    <div onClick={addDynamicForm} className="flex border rounded-lg p-3 w-fit cursor-pointer">
                        <IoMdAdd size={25} /> Add Resource
                    </div>
                    <br />
                    {formui}
                </div>

                <br />
                <br />
                <b className="text-[20px] self-start">Total Expense:</b>
                <input
                    name="totalExpense"
                    type="text"
                    value={totalExpense}
                    readOnly
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-full hover:bg-slate-200 border"
                />
                <b className="text-[20px] self-start">Upload Receipts/Bills</b>
                <input type="file" onChange={handleFileUpload} name="receiptFile" id="" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />
                <Link>
                    <div onClick={handleSend} className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                        <b>Update</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default UpdateProjectData;
