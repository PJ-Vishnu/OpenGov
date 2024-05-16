import { Link, useParams } from "react-router-dom";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import axios from 'axios';
import { warningToast } from "../../Toast";

function CreateTender() {
    const { id } = useParams();
    const companyId = localStorage.getItem("company-id");

    const [dynamicForm, setDynamic] = useState([{ name: '', amount: '' }]);
    const [requestLetter, setRequestLetter] = useState("");
    const [totalBudget, setTotalBudget] = useState(0);
    const [tenderFile, setTenderFile] = useState(null);

    useEffect(() => {
        let sum = 0;
        dynamicForm.forEach(item => {
            sum += parseFloat(item.amount);
        });
        setTotalBudget(sum);
    }, [dynamicForm]);

    const addDynamicForm = () => {
        const lastItem = dynamicForm[dynamicForm.length - 1];
        if (lastItem.name !== '' && lastItem.amount !== 0) {
            setDynamic([...dynamicForm, { name: '', amount: '' }]);
        }
        else{
            warningToast("Please fill the data first!")
        }
    };

    const deleteDynamicForm = (indexOf) => {
        const updatedForm = [...dynamicForm];
        updatedForm.splice(indexOf, 1);
        setDynamic(updatedForm);
    };

    const handleFileUpload = (event) => {
        setTenderFile(event.target.files[0]);
    };

    const handleSend = () => {
        const tenderData = {
            projectId: id,
            companyId: companyId,
            requestLetter: requestLetter,
            tenderEstimate: JSON.stringify(dynamicForm),
            totalBudget: totalBudget
        };
    
        const formData = new FormData();
        formData.append('estimateFile', tenderFile); // Use 'estimateFile' as the field name
    
        for (let key in tenderData) {
            formData.append(key, tenderData[key]);
        }
    
        axios.post('http://localhost:4000/tenders/createTender', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Tender data sent successfully:', response);
        })
        .catch(error => {
            console.error('Error sending tender data:', error);
        });
    };

    const formui = dynamicForm.map((item, index) => {
        return (
            <div className="gap-2 flex m-3 items-center" key={index}>
                <input
                    value={item.name}
                    type="text"
                    placeholder="Resource or Material:"
                    onChange={(e) => {
                        const copy = [...dynamicForm];
                        copy[index].name = e.target.value;
                        setDynamic(copy);
                    }}
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border"
                />
                <MdOutlineCurrencyRupee size={25} />
                <input
                    value={item.amount}
                    name="amount"
                    placeholder="Amount Required in Rupees"
                    onChange={(e) => {
                        const copy = [...dynamicForm];
                        copy[index].amount = e.target.value;
                        setDynamic(copy);
                    }}
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
                <b className="text-[36px]">Create new Tender</b>
                <br />
                <hr />
                <b className="text-[20px] self-start">Project ID:</b>
                <input type="text" placeholder="Project ID" value={id} readOnly />
                <br />
                <b className="text-[20px] self-start">Request Letter</b>
                <textarea
                    name="letter"
                    cols="30"
                    rows="10"
                    placeholder="Write your request here"
                    value={requestLetter}
                    onChange={(e) => setRequestLetter(e.target.value)}
                    className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"
                ></textarea>
                <br />
                <b className="text-[20px] self-start">Tender Estimate</b>
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
                <b className="text-[20px] self-start">Total Budget:</b>
                <input
                    type="text"
                    value={totalBudget}
                    readOnly
                    className="bg-white shadow-lg px-5 py-3 hover:underline w-full hover:bg-slate-200 border"
                />
                <br />
                <br />
                <b className="text-[20px] self-start">Upload Estimate</b>
                <input
                    type="file"
                    name="estimateFile"
                    onChange={handleFileUpload}
                    className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3"
                />
                <br />
                <button onClick={handleSend} className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                    <b>Submit</b>
                </button>
            </div>
        </div>
    );
}

export default CreateTender;
