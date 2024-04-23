import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { IoClose, IoSearch } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { FaHamburger, FaSignOutAlt } from "react-icons/fa";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { IoConstructOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoNotificationsCircleOutline  } from "react-icons/io5";

function CompanyLayout() {

    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("company-id")){
                navigate('/signin')
        }
    },[navigate])

    const logout = ()=>{
        localStorage.removeItem('company-id')
        navigate('/')
    }


    const [selectLink, setSelectLink] = useState('home')
    const [activeSideBar, setActiveSideBar] = useState(false)
    return (
        <div className=" flex justify-center">

            {/* header */}
            <div className="fixed w-[98.8%] text-[#213361] text-sm bg-white h-[75px] flex justify-between border-[2px] border-[#213361] items-center rounded-[20px] m-3 lg:text-2xl xl:text-3xl sm:text-sm">
                <div className="items-start flex m-auto ml-[20px] w-1/4 ">
                    <b onClick={() => setSelectLink('home')}> <Link to={'/company/'}>OpenGov</Link></b>
                </div>
                <div className="m-auto w-4/6 h-2/3 flex justify-center">
                    <input className="border-[1px] border-[#213361] outline-none px-8 w-full rounded-[20px] items-center pl-5 pr-20" type="search" name="Search" id="" placeholder="Search..." />
                    <IoSearch size={40} className="-mb-9 -ml-14 " />
                </div>
                <div className="w-1/4 h-4/5 flex-row items-center flex mr-[20px] gap-2">
                    <div className="w-full h-full"></div> 
                    <Link to={"notification"}><IoNotificationsCircleOutline className="w-10 h-10"/></Link>
                    <Link to={"editprofile"}><VscAccount className="w-10 h-10"/></Link>
                </div>
            </div>
            {/* -------------------- */}
            <hr />

            <div className="pt-20 flex gap-4 w-full jusify-center">
                {/* Admin Sidebar */}
                <div className="fixed rounded-[20px] hidden sm:flex m-3 w-1/5 h-[88.7vh] bg-[#213361] text-[0px] justify-center xl:text-[28px] lg:text-[24px] sm:text-[0px]">
                    <div className="w-full">
                        <ul>
                            <li onClick={() => setSelectLink('home')} ><Link to={'/company/'}><div className={`${selectLink === 'home' ? 'ms-3 mt-3 mb-3 -me-5 pl-6 rounded-s-[20px]' : 'm-3 rounded-[20px]'} flex items-center bg-white  p-2 text-[#213361] sm:text-hidden`}><MdOutlineDashboard size={45} className="ml-3 mr-3" /><b>Dashboard</b></div></Link></li>
                            <li onClick={() => setSelectLink('projects')} ><Link to={'/company/projects'}><div className={`${selectLink === 'projects' ? 'ms-3 mt-3 mb-3 -me-5 pl-6 rounded-s-[20px]' : 'm-3 rounded-[20px]'} flex items-center bg-white  p-2 text-[#213361] sm:text-hidden`}><AiOutlineFundProjectionScreen size={45} className="ml-3 mr-3" /><b>Projects</b></div></Link></li>
                            <li onClick={() => setSelectLink('tenders')} ><Link to={'/company/tenderingprojects'}><div className={`${selectLink === 'tenders' ? 'ms-3 mt-3 mb-3 -me-5 pl-6 rounded-s-[20px]' : 'm-3 rounded-[20px]'} flex items-center bg-white  p-2 text-[#213361] sm:text-hidden`}><FaRegListAlt size={45} className="ml-3 mr-3" /><b>Tenders</b></div></Link></li>
                            <li onClick={() => setSelectLink('ourprojects')} ><Link to={'/company/ourproject'}><div className={`${selectLink === 'ourprojects' ? 'ms-3 mt-3 mb-3 -me-5 pl-6 rounded-s-[20px]' : 'm-3 rounded-[20px]'} flex items-center bg-white  p-2 text-[#213361] sm:text-hidden`}><IoConstructOutline size={45} className="ml-3 mr-3" /><b>Our Projects</b></div></Link></li>
                            <li onClick={logout} ><Link to={'/'}><div className=" flex items-center bg-white rounded-[20px] p-2 text-[#213361] m-3 mt-[280px]"><FaSignOutAlt size={45} className="ml-3 mr-5 sm:text-hidden" /><b>Sign Out</b></div></Link></li>
                        </ul>
                    </div>
                </div>


                {/* mobile sidebar */}

                <div onClick={() => setActiveSideBar(!activeSideBar)} className="bg-[#213361]  text-white absolute top-[13%] -left-4 z-40 px-4 py-5 rounded-md block sm:hidden">
                <BsLayoutTextSidebarReverse size={20} />
                </div>

                <div className={` ${activeSideBar ? ' translate-x-[0px]' : '-translate-x-[300px] '}  duration-1000  transition-all bg-slate-600  w-[20%] block absolute top-[25%] h-fit sm:hidden flex-col  justify-center items-center `}>
                    <div className=" border-[#213361] border-2">
                        <ul>
                            <li onClick={() => setSelectLink('home')} ><Link to={'/company/'}><div className=' flex items-center bg-white  p-2 text-[#213361]'><MdOutlineDashboard size={45} className="ml-3 mr-3" /></div></Link></li>
                            <li onClick={() => setSelectLink('projects')} ><Link to={'/company/projects'}><div className=' flex items-center bg-white  p-2 text-[#213361]'><AiOutlineFundProjectionScreen size={45} className="ml-3 mr-3" /></div></Link></li>
                            <li onClick={() => setSelectLink('tenders')} ><Link to={'/company/projects'}><div className=' flex items-center bg-white  p-2 text-[#213361]'><FaRegListAlt size={45} className="ml-3 mr-3" /></div></Link></li>
                            <li onClick={() => setSelectLink('ourproject')} ><Link to={'/company/ourproject'}><div className=' flex items-center bg-white  p-2 text-[#213361]'><IoConstructOutline size={45} className="ml-3 mr-3" /></div></Link></li>
                            <li onClick={logout} ><Link to={'/'}><div className=' flex items-center bg-white  p-2 text-[#213361]'><FaSignOutAlt size={45} className="ml-3 mr-5" /></div></Link></li>
                        </ul>
                    </div>

                </div>



                <div className=" overflow-scroll m-auto sm:ml-[21.5%]  w-[98.8%] mt-3 md:w-[78vw] h-[88.7vh] border-[2px] border-[#213361] rounded-[20px] bg-white">
                    <Outlet />
                </div>
            </div>


        </div>
    )
}
export default CompanyLayout