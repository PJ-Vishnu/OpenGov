import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { IoSearch } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { FaSignOutAlt } from "react-icons/fa";

function Layout() {
    const [selectLink,setSelectLink] = useState('home')
    return (
        <div className="">

            {/* header */}
            <div className="fixed w-[98.8%] text-[#213361] text-3xl h-[75px] flex justify-between border-[2px] border-[#213361] items-center rounded-[20px] m-3">
                <div className="items-start m-auto ml-[20px] w-1/4">
                    <b>OpenGov</b>
                </div>
                <div className="m-auto w-4/6 h-2/3 flex justify-center">
                    <input className="border-[1px] border-[#213361] outline-none px-8 w-full rounded-[20px] items-center pl-5 pr-20" type="search" name="Search" id="" placeholder="Search..."/>
                    <IoSearch size={40} className="-mb-9 -ml-14 "/>
                </div>
                <div className="w-1/4 h-4/5 items-center flex mr-[20px]">
                    <div className="w-full h-full"></div>
                    <b>Admin</b>
                </div>
            </div>
            {/* -------------------- */}
            <hr />

            <div className="pt-20 flex gap-4 w-full jusify-center">
                {/* Admin Sidebar */}
                <div className="fixed rounded-[20px] flex m-3 w-1/5 h-[88.7vh] bg-[#213361] text-[0px] justify-center xl:text-[28px] lg:text-[24px] sm:text-[0px]">
                    <div className="w-full">
                        <ul>
                            <li onClick={()=>setSelectLink('home')} ><Link to={'/admin/'}><div className={`${selectLink === 'home' ? 'ms-3 mt-3 mb-3 -me-5 pl-6' : 'm-3' } flex items-center bg-white rounded-[20px] p-2 text-[#213361]`}><MdOutlineDashboard size={45} className="ml-3 mr-5"/><b>Dashboard</b></div></Link></li>
                            <li onClick={()=>setSelectLink('projects')} ><Link to={'/admin/projects'}><div className={`${selectLink === 'projects' ? 'ms-3 mt-3 mb-3 -me-5 pl-6' : 'm-3'} flex items-center bg-white rounded-[20px] p-2 text-[#213361]`}><AiOutlineFundProjectionScreen size={45} className="ml-3 mr-5"/><b>Projects</b></div></Link></li>
                            <li onClick={()=>setSelectLink('companies')} ><Link to={'/admin/companies'}><div className={`${selectLink === 'companies' ? 'ms-3 mt-3 mb-3 -me-5 pl-6' : 'm-3'} flex items-center bg-white rounded-[20px] p-2 text-[#213361]`}><BsBuildings size={45} className="ml-3 mr-5" /><b>Companies</b></div></Link></li>
                            <li onClick={()=>setSelectLink('citizen')} ><Link to={'/admin/viewusers'}><div className={`${selectLink === 'citizen' ? 'ms-3 mt-3 mb-3 -me-5 pl-6' : 'm-3'} flex items-center bg-white rounded-[20px] p-2 text-[#213361]`}><HiOutlineUsers size={45} className="ml-3 mr-5" /><b>Citizens</b></div></Link></li>
                            <li onClick={()=>setSelectLink('interactions')} ><Link to={'/admin/interactions'}><div className={`${selectLink === 'interactions' ? 'ms-3 mt-3 mb-3 -me-5 pl-6' : 'm-3'} flex items-center bg-white rounded-[20px] p-2 text-[#213361]`}><LuMessagesSquare size={45} className="ml-3 mr-5" /><b>Interaction</b></div></Link></li>
                            <li onClick={()=>setSelectLink('signout')} ><Link to={'/'}><div className=" flex items-center bg-white rounded-[20px] p-2 text-[#213361] m-3 mt-[280px]"><FaSignOutAlt size={45} className="ml-3 mr-5" /><b>Sign Out</b></div></Link></li>
                        </ul>
                    </div>
                </div>
                <div className=" overflow-scroll fixed ml-[21.5%]  m-3 w-[78.3vw] h-[88.7vh] border-[2px] border-[#213361] rounded-[20px] ">
                    <Outlet />
                </div>
            </div>


        </div>
    )
}
export default Layout