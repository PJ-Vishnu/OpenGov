import { Link, useParams } from "react-router-dom"

function RequestMoreFunds(){

    const { id } = useParams();
    
    return(
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
                <textarea name="estimate" id="" cols="30" rows="10" placeholder="Estimate of the project" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                <br />
                <br />
                <b className="text-[20px] self-start">Upload Formal Request Letter</b>
                <input type="file" name="" id="" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />
                <Link>
                    <div className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                        <b>Send Request</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default RequestMoreFunds