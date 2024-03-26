import { Link } from "react-router-dom"


function CitizenReportProject() {
    return (
        <div>
            <div className="flex flex-col m-3">
                <b className="text-[36px]">Reply</b><br />
                <hr />
                <b className="text-[20px] self-start">Project ID</b>
                <input type="text" name="" id="" placeholder="Project ID" readOnly className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />

                <b className="text-[20px] self-start">Report</b>
                <textarea name="address" id="" cols="30" rows="10" placeholder="Write your Report here" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                <br />
                <b className="text-[20px] self-start">Location</b>
                <div className=" w-[300px] h-[300px] border-[2px] border-[#213361] rounded-lg">

                </div>
                <br />
                <b className="text-[20px] self-start">Attach Documents</b>
                <input type="file" name="" id="" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />
                <Link >
                    <div className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                        <b>Report</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default CitizenReportProject