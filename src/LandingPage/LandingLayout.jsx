import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import LandingPageCitizen from "./content/LandingPageCitizen"
function LandingLayout() {
    const [selectLink,setSelectLink] = useState('citizenlanding')
    return (
        <div>   
            {/* Header Begins */}
            <div className="fixed w-[98.8%] text-[#213361] text-3xl h-[75px] flex justify-between border-[2px] border-[#213361] items-center rounded-[20px] m-3">
                <div className="m-auto ml-[20px] w-1/4 items-center">
                    <b><Link to={'/'}>OpenGov</Link></b>
                </div>
                <div className="flex gap-9   pe-6 justify-end m-auto mr-3 w-full items-center">
                    <ul className="flex gap-9">
                        <li onClick={()=>setSelectLink('citizenlanding')} className={`${selectLink === 'citizenlanding' ? 'border-[2px] border-[#213361] rounded-[20px] p-1':""}`}><Link to={'/'}>Citizens</Link></li>
                        <li onClick={()=>setSelectLink('govtlanding')} className={`${selectLink === 'govtlanding' ? 'border-[2px] border-[#213361] rounded-[20px] p-1':""}`}><Link to={'/govtlanding'}>Govt.</Link></li>
                        <li onClick={()=>setSelectLink('companylanding')} className={`${selectLink === 'companylanding' ? 'border-[2px] border-[#213361] rounded-[20px] p-1':""}`}><Link to={'/companylanding'}>Company</Link></li>
                        <li onClick={()=>setSelectLink('signin')} className={`${selectLink === 'signin' ? 'border-[2px] border-[#213361] rounded-[20px] p-1':"text-white p-1 rounded-[20px] bg-[#213361]"}`}><Link to={'/signin'}>LogIn / SignUp</Link></li>
                    </ul>
                </div>
            </div>
            {/* Header Ends */}
            {/* Body Begins */}
            <div className=" overflow-scroll overflow-x-hidden fixed top-20 m-3 w-[98.8%] h-[88.7vh] border-[2px] border-[#213361] rounded-[20px] ">
                <Outlet />
            </div>
        </div>
    )
}
export default LandingLayout