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
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/contracts/viewProject/${id}`);
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

    const handleNameChange = (index, value) => {
        const updatedForm = [...dynamicForm];
        updatedForm[index].name = value;
        setDynamic(updatedForm);
    };

    const handleAmountChange = (index, value) => {
        const updatedForm = [...dynamicForm];
        const tenderEstimateAmount = tenderEstimateAmounts[updatedForm[index].name] || 0;

        if (value < tenderEstimateAmount) {
            warningToast(`Amount should be above the tender estimate amount (${tenderEstimateAmount}) for ${updatedForm[index].name}`);
            return;
        }

        updatedForm[index].amount = value;
        setDynamic(updatedForm);
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

            const response = await axios.put('http://localhost:4000/your-endpoint', formData, {
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
        const isTenderEstimateField = index < tenderEstimateOptions.length; // Check if the field is from tenderEstimate
        const isEditableNameField = !isTenderEstimateField; // Check if the name field should be editable
        
        return (
            <div className="gap-2 flex m-3 items-center" key={index}>
                <input
                    value={item.name}
                    name="name"
                    placeholder="Enter resource name"
                    readOnly={!isEditableNameField} // Set readOnly based on whether it's editable or not
                    onChange={(e) => handleNameChange(index, e.target.value)} // Allow editing for new resources
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
                {!isTenderEstimateField && ( // Render the remove button only if it's not from tenderEstimate
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
