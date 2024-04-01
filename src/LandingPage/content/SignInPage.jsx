import { Link, Outlet } from "react-router-dom"
function SignInPage(){
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-full h-full border-[2px] border-[#213361] rounded-[20px] m-3 text-center items-center">
                <div className="m-5">
                    <b className="text-[36px]">Login</b>
                </div>
                <div className="flex flex-col w-1/2 items-start mt-6">
                    <b className="text-[20px]">Email</b>
                    <input type="email" name="" id="" placeholder="example@email.com" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3"/>
                    <br />
                    <br />
                    <b className="text-[20px]">Password</b>
                    <input type="password" name="" id="" placeholder="Password" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3"/>
                    <b className="self-end">Forgot Password?</b>
                    <br />
                    <b className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 self-center">Log In</b>
                    <br />
                    <b className="self-center underline"><Link to={'/signup'}>Register new User</Link></b>
                </div>
            </div>
        </div>
    )
}
export default SignInPage