import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

function Layout() {
    const [selectLink,setSelectLink] = useState('home')

    return (
        <div className="" >

            {/* header */}
            <div className="fixed w-[98.8%] text-[#213361] text-3xl h-[75px] flex justify-between border-[2px] border-[#213361] items-center rounded-[20px] m-3">
                <div className="items-start m-auto ml-[20px] w-1/4">
                    <b>OpenGov</b>
                </div>
                <div className="m-auto w-4/6 h-2/3 flex justify-center">
                    <input className="border-[1px] border-[#213361] outline-none px-8 w-full rounded-[20px] items-center" type="search" name="Search" id="" />
                </div>
                <div className="w-1/4 h-4/5 items-center flex mr-[20px]">
                    <div className="w-full h-full"></div>
                    <b>Admin</b>
                </div>
            </div>
            {/* -------------------- */}
            <hr />

            <div className="pt-20 flex w-full">
                {/* Admin Sidebar */}
                <div className="fixed rounded-[20px] flex m-3 w-1/5 h-[88.7vh] bg-[#213361] text-[32px] justify-center ">
                    <div className="w-full">
                        <ul>
                            <li onClick={()=>setSelectLink('home')} ><Link to={'/admin/'}><div className={`${selectLink === 'home' ? 'ms-3 mt-3 mb-3 -me-5' : 'm-3' } flex justify-center bg-white rounded-[20px] p-2 text-[#213361]`}><img src="" alt="" /><b>Dashboard</b></div></Link></li>
                            <li onClick={()=>setSelectLink('projects')} ><Link to={'/admin/projects'}><div className={`${selectLink === 'projects' ? 'ms-3 mt-3 mb-3 -me-5' : 'm-3'} flex justify-center bg-white rounded-[20px] p-2 text-[#213361]`}><img src="" alt="" /><b>Projects</b></div></Link></li>
                            <li onClick={()=>setSelectLink('companies')} ><Link to={'/admin/companies'}><div className={`${selectLink === 'companies' ? 'ms-3 mt-3 mb-3 -me-5' : 'm-3'} flex justify-center bg-white rounded-[20px] p-2 text-[#213361]`}><img src="" alt="" /><b>Companies</b></div></Link></li>
                            <li onClick={()=>setSelectLink('citizen')} ><Link to={'/admin/viewusers'}><div className={`${selectLink === 'citizen' ? 'ms-3 mt-3 mb-3 -me-5' : 'm-3'} flex justify-center bg-white rounded-[20px] p-2 text-[#213361]`}><img src="" alt="" /><b>citizens</b></div></Link></li>
                            <li onClick={()=>setSelectLink('interactions')} ><Link to={'/admin/interactions'}><div className={`${selectLink === 'interactions' ? 'ms-3 mt-3 mb-3 -me-5' : 'm-3'} flex justify-center bg-white rounded-[20px] p-2 text-[#213361]`}><img src="" alt="" /><b>Interaction</b></div></Link></li>
                            <li onClick={()=>setSelectLink('signout')} ><Link to={'/'}><div className=" flex justify-center bg-white rounded-[20px] p-2 text-[#213361] m-3 mt-[280px]"><img src="" alt="" /><b>Sign Out</b></div></Link></li>
                        </ul>
                    </div>
                </div>
                <div className=" overflow-scroll overflow-x-hidden fixed left-[365px] m-3 w-[78.3vw] h-[88.7vh] border-[2px] border-[#213361] rounded-[20px] ">
                    <Outlet />
                </div>
            </div>


        </div>
    )
}
export default Layout