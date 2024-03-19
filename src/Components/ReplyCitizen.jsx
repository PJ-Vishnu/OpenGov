import { Link } from "react-router-dom"
function ReplyCitizen() {
    return (
        <div>
            <div className="flex flex-col m-3">
                <b className="text-[36px]">Reply</b><br />
                <hr />
                <b className="text-[20px] self-start">User ID</b>
                <input type="text" name="" id="" placeholder="User Name" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />
                <b className="text-[20px] self-start">Query/Sugestion/Report</b>
                <textarea name="address" id="" cols="30" rows="10" placeholder="Users Query, suggestion or Reports apper here" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                <br />
                <b className="text-[20px] self-start">Location</b>
                <div className=" w-[300px] h-[300px] border-[2px] border-[#213361] rounded-lg">

                </div>
                <br />
                <b className="text-[20px] self-start">Write Reply</b>
                <textarea name="address" id="" cols="30" rows="10" placeholder="Write Reply here" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                <br />
                <Link >
                    <div className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                        <b>Reply</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default ReplyCitizen