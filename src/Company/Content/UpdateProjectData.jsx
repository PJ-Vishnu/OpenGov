import { Link } from "react-router-dom"
import { IoMdAdd, IoMdRemove } from "react-icons/io"
import { useEffect, useState } from "react"
import { MdOutlineCurrencyRupee } from "react-icons/md";

function UpdateProjectData() {
    return (
        <div>
            <div className="flex flex-col m-3">
                <b className="text-[36px]">Update Project Data</b><br />
                <hr />
                <b className="text-[20px] self-start">Project ID</b>
                <input type="text" placeholder="Project ID" readOnly />
                <br />

                <b className="text-[20px] self-start">Progress Report</b>
                <textarea name="letter" id="" cols="30" rows="10" placeholder="Write your report here" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                <br />



                <b className="text-[20px] self-start">Update Expenditure</b>
                <div className="flex flex-col border-[2px] border-[#213361] rounded-lg w-full h-fit pl-3"><br />
                     Update Expense on Resource<br />
                    <div className="gap-2 flex m-3 items-center">
                        <input type="text" name="" id="" placeholder="Resource" className=" bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border "/>
                        <MdOutlineCurrencyRupee size={25} />
                        <input type="number" name="" id="" placeholder="Amount Spent on Resource" className=" bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border "/>
                    </div>
                </div>


                <br />
                <br />
                <b className="text-[20px] self-start">Upload Recipts/Bills</b>
                <input type="file" name="" id="" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />
                <Link>
                    <div className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                        <b>Update</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default UpdateProjectData