import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { errorToast, successToast } from "../../Toast";

function CitizenReportProject() {
    const { id } = useParams();
    const [citizenId, setCitizenId] = useState("");
    const [date, setDate] = useState(Date.now());


    const [formData, setFormData] = useState({
        contractId: id,
        report: "",
        date: '',
        type: "",
        files: null, // Added files field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTypeChange = (e) => {
        const type = e.target.value;
        setFormData({ ...formData, type });
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setFormData({ ...formData, files: files }); // or simply setFormData({ ...formData, files });
    };

    useEffect(() => {
        const storedCitizenId = localStorage.getItem("citizen-id");
        setCitizenId(storedCitizenId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("citizenId", citizenId);
        formDataToSend.append("contractId", formData.contractId);
        formDataToSend.append("type", formData.type);
        formDataToSend.append("report", formData.report);
        formDataToSend.append("date", date);
        if (formData.files) {
            for (let i = 0; i < formData.files.length; i++) {
                formDataToSend.append("files", formData.files[i]);
            }
        }

        try {
            const response = await axios.post("https://opengov-server.onrender.com/reports/report", formDataToSend);
            successToast("Data sent successfully:", response.data);
            // Handle success, maybe show a success message to the user
        } catch (error) {
            errorToast("Error sending data:", error);
            // Handle error, show an error message to the user
        }
    };

    return (
        <div>
            <div className="flex flex-col m-3">
                <b className="text-[36px]">Report</b><br />
                <hr />
                <b className="text-[20px] self-start">Contract ID</b>
                <input type="text" name="contractId" id="" disabled placeholder="Contract ID" onChange={handleChange} value={id} readOnly className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />

                <b className="text-[20px] self-start">Report</b>
                <textarea name="report" id="" cols="30" rows="10" placeholder="Write your Report here" onChange={handleChange} className="border-[2px] border-[#213361] rounded-lg w-full h-50 pl-3"></textarea>
                <br />
                <b className="text-[20px] self-start">Type</b>
                <div className="flex gap-3 text-lg">
                    <label>
                        <input type="radio" name="type" value="complaint"  onLoad={handleTypeChange} onChange={handleTypeChange} checked={formData.type === 'complaint'} />
                        Complaint
                    </label>
                    <label>
                        <input type="radio" name="type" value="media" onChange={handleTypeChange} checked={formData.type === 'media'} />
                        Media Upload
                    </label>
                </div>
                <br />
                <b className="text-[20px] self-start">Attach Documents</b>
                <input type="file" name="files" id="" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" multiple onChange={handleFileChange} />
                <br />
                <button onClick={handleSubmit} className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                    <b>Report</b>
                </button>
            </div>
        </div>
    );
}

export default CitizenReportProject;
