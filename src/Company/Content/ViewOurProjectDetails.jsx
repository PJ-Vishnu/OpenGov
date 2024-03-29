import { Link } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";

function ViewOurProjectDetails() {
    return (
        <div>
            <div className="flex flex-row">
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-3/4 h-[50vh] text-2xl">
                    <b className="pl-3">Project Name: Name</b><br /><br />
                    <b className="pl-3">Iitiated by: Govt lvl</b><br /><br />
                    <b className="pl-3">Company Working: Company 1</b><br /><br />
                    <b className="pl-3">Budget of Project: &#8377; 10,00,000</b><br /><br />

                </div>
                <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-1/4 h-[50vh]">

                </div>
            </div>
            <div className="border-[2px] border-[#213361] rounded-[20px] m-5 w-[97.2%] h-[100vh]">

            </div>
            <Link to={"requestfunds"}>
                <div className="absolute right-9 flex flex-col justify-center items-center    bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <GiReceiveMoney color="#213361" size={30} />
                    Request Funds
                </div>
            </Link>
            <Link to={"updateproject"}>
                <div className="absolute right-52 flex flex-col justify-center items-center    bottom-10 m-3 p-3 rounded-2xl bg-white border-[2px] border-[#213361]">
                    <GrUpdate color="#213361" size={30} />
                    Update Data
                </div>
            </Link>
        </div>
    )
}
export default ViewOurProjectDetails