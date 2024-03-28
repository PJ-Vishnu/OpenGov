import { Link } from "react-router-dom"
import { IoMdAdd, IoMdRemove } from "react-icons/io"
import { useEffect, useState } from "react"
import { MdOutlineCurrencyRupee } from "react-icons/md";

function CreateTender() {

    const [dynamicForm, setDynamic] = useState([])

    useEffect(() => {

    }, [dynamicForm])

    const addDynamicForm = () => {
        setDynamic([...dynamicForm, { name: '', amount: 0 }])
    }

    const deleteDynamicForm = (indexOf) => {
        // Create a copy of the array to avoid mutation issues
        const updatedForm = [...dynamicForm];

        // Remove the element at the specified index using splice
        updatedForm.splice(indexOf, 1); // Removes 1 element at indexOf

        setDynamic(updatedForm);
    };


    console.log(dynamicForm, 'dynamic form');
    // spread operator

    const formui = dynamicForm.map((item, index, array) => {
        return (
            <div className="gap-2 flex m-3 items-center" key={index}>

                <input value={item.name} type="text" placeholder="Resource or Material:" onChange={(e) => {
                    const copy = [...dynamicForm]
                    copy[index].name = e.target.value
                    setDynamic(copy)
                }} className=" bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border " />
                <MdOutlineCurrencyRupee size={25} />
                <input
                    value={item.amount}
                    name="amount"
                    placeholder="Amount Required in Rupees"
                    onChange={(e) => {
                        const copy = [...dynamicForm]
                        copy[index].amount = e.target.value
                        setDynamic(copy)
                    }}
                    type="number" className=" bg-white shadow-lg px-5 py-3 hover:underline w-1/2 hover:bg-slate-200 border " />
                <IoMdRemove size={25} onClick={() => deleteDynamicForm(index)} />
            </div>
        )
    })



    return (
        <div>
            <div className="flex flex-col m-3">
                <b className="text-[36px]">Create new Tender</b><br />
                <hr />
                <b className="text-[20px] self-start">Project ID</b>
                <input type="text" placeholder="Project ID" readOnly />
                <br />

                <b className="text-[20px] self-start">Request Letter</b>
                <textarea name="letter" id="" cols="30" rows="10" placeholder="Write your request here" className="border-[2px] border-[#213361] rounded-lg w-full h-20 pl-3"></textarea>
                <br />



                <b className="text-[20px] self-start">Tender Estimate</b>
                <div className="flex flex-col border-[2px] border-[#213361] rounded-lg w-full h-fit pl-3"><br />
                    <div onClick={addDynamicForm} className="flex border rounded-lg p-3 w-fit cursor-pointer"> <IoMdAdd size={25} /> Add Resource </div><br />
                    {formui}
                </div>


                <br />
                <br />
                <b className="text-[20px] self-start">Upload Estimate</b>
                <input type="file" name="" id="" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />
                <Link>
                    <div className="bg-[#213361] text-white rounded-lg w-fit h-fit p-3 pl-5 pr-5 self-center">
                        <b>Send</b>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default CreateTender