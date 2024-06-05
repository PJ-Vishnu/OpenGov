import { Link } from "react-router-dom"


function Citizen_QueryReply() {
    return (
        <div>
            <div className="flex flex-col m-3">
                <b className="text-[36px]">Send Querry</b><br />
                <hr />
                <b className="text-[20px] self-start">Querry Type</b>
                <optgroup>
                    <option value="Querry">Querry</option>
                    <option value="Suggestion">Suggestion</option>
                </optgroup>
                <br />

                <b className="text-[20px] self-start">Querry/Suggestion</b>
                <textarea name="message" id="" cols="30" rows="10" placeholder="Write your message here" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
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
                        <b>Send</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Citizen_QueryReply