import { Link, useParams } from "react-router-dom";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import axios from "axios";
import { errorToast, successToast, warningToast } from "../../Toast";

function RequestMoreFunds(){

    const { id } = useParams();
    
    const [dynamicForm, setDynamic] = useState([{ name: '', amount: '' }]);
    const [tenderEstimateOptions, setTenderEstimateOptions] = useState([]);
    const [newTenderEstimate, setNewTenderEstimate] = useState('');
    const [tenderEstimateAmounts, setTenderEstimateAmounts] = useState({});
    const [tenderFile, setTenderFile] = useState(null); // State to hold uploaded file
    const [deletableFields, setDeletableFields] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://opengov-server.onrender.com/contracts/viewProjectCompany/${id}`);
                if (response.data.result && response.data.result.tenderEstimate) {
                    const options = response.data.result.tenderEstimate;
                    setDynamic(options);

                    // Extract and store tender estimate amounts if not already present
                    if (Object.keys(tenderEstimateAmounts).length === 0) {
                        const amounts = {};
                        options.forEach(option => {
                            amounts[option.name] = option.amount;
                        });
                        setTenderEstimateAmounts(amounts);
                    }

                    // Initialize deletableFields array based on whether the field name exists in tenderEstimateOptions
                    const initialDeletableFields = options.map(option => !options.some(existingOption => existingOption.name === option.name));
                    setDeletableFields(initialDeletableFields);
                }
            } catch (error) {
                console.error('Error fetching tender data:', error);
            }
        };

        fetchData();
    }, [id, tenderEstimateAmounts]);

    const addDynamicForm = () => {
        const lastItem = dynamicForm[dynamicForm.length - 1];
        if (lastItem?.name !== '' ) {
            setDynamic([...dynamicForm, { name: '', amount: '' }]);
            setDeletableFields([...deletableFields, true]);
        }
        else {
            warningToast("Please fill the data first!");
        }
    };

    const deleteDynamicForm = (indexOf) => {
        if (deletableFields[indexOf]) {
            const updatedForm = [...dynamicForm];
            updatedForm.splice(indexOf, 1);
            setDynamic(updatedForm);
            setDeletableFields(prev => {
                const updatedDeletableFields = [...prev];
                updatedDeletableFields.splice(indexOf, 1);
                return updatedDeletableFields;
            });
        } else {
            warningToast("This field cannot be deleted because it's part of the tender estimate.");
        }
    };

    const handleNameChange = (index, value) => {
        const updatedForm = [...dynamicForm];
        updatedForm[index].name = value;
        setDynamic(updatedForm);
    };

    const handleAmountChange = (index, value) => {
        const updatedForm = [...dynamicForm];
        const tenderEstimateAmount = tenderEstimateAmounts[updatedForm[index].name] || 0;
    
        updatedForm[index].amount = value;
    
        // Check if the entered amount is less than the tender estimate amount when the input field loses focus
        if (value !== '' && value < tenderEstimateAmount) {
            // Show warning toast when the input field loses focus
            warningToast(`Amount should be above the tender estimate amount (${tenderEstimateAmount}) for ${updatedForm[index].name}`);
        } else {
            setDynamic(updatedForm);
        }
    };
    
    
    
    const handleFileUpload = (event) => {
        setTenderFile(event.target.files[0]);
    };

    const handleSendRequest = async () => {
        try {
            const formData = new FormData();
            formData.append('contractId', id);
            formData.append('requestLetter', 'Your request letter text here');
            formData.append('newTenderEstimate', newTenderEstimate);
            formData.append('expenditure', JSON.stringify(dynamicForm));
            formData.append('file', tenderFile);

            const response = await axios.post('https://opengov-server.onrender.com/contracts/expenserequest', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Handle success response
            console.log('Request sent successfully:', response.data);
            successToast('Request sent successfully!');
        } catch (error) {
            // Handle error response
            console.error('Error sending request:', error);
            errorToast('Error sending request. Please try again later.');
        }
    };

    const formui = dynamicForm.map((item, index) => {
        const isEditableNameField = deletableFields[index];

        return (
            <div className="gap-2 flex m-3 items-center" key={index}>
                <input
                    value={item.name}
                    name="name"
                    placeholder="Enter resource name"
                    readOnly={!isEditableNameField}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border"
                />
                <input
                    value={item.amount}
                    name="amount"
                    placeholder="Amount Required in Rupees"
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                    type="number"
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border"
                />
                <MdOutlineCurrencyRupee size={25} />
                {isEditableNameField && (
                    <IoMdRemove size={25} onClick={() => deleteDynamicForm(index)} />
                )}
            </div>
        );
    });

    return (
        <div>
            <div className="flex flex-col m-3">
                <b className="text-[36px]">Create new Request for Funds</b><br />
                <hr />
                <b className="text-[20px] self-start">Project ID</b>
                <input type="text" placeholder="Project ID" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" readOnly value={id}/>
                <br />

                <b className="text-[20px] self-start">Request Letter</b>
                <textarea name="letter" id="" cols="30" rows="10" placeholder="Write your request here" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                <br />
                <b className="text-[20px] self-start">New Tender Estimate</b>
                <div className="flex flex-col border-[2px] border-[#213361] rounded-lg w-full h-fit pl-3">
                    <br />
                    <div onClick={addDynamicForm} className="flex border rounded-lg p-3 w-fit cursor-pointer">
                        <IoMdAdd size={25} /> Add Resource
                    </div>
                    <br />
                    {formui}
                </div>
                <br />
                <b className="text-[20px] self-start">Upload Request Letter & Estimate</b>
                <input type="file" name="" onChange={handleFileUpload} id="" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />
                <Link to="#">
                    <div onClick={handleSendRequest} className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                        <b>Send Request</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default RequestMoreFunds;
