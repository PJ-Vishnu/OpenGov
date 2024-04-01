import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { errorToast } from "../../Toast";




function SignInPage() {



    const [formdata,setFormdata] = useState({
        email:"",
        password:""
    });

  

    const handlerChange = (e)=>{
        console.log(e.target.value);
        console.log(e.target.name);
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()


        if(!formdata.email){
          return  errorToast('Mail is required')
        }

        if(!formdata.password){
            return  errorToast('password is required')
          }

        console.log(formdata);
    }



  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-2/5 h-[86vh] border-[2px] border-[#213361] rounded-[20px] m-3 text-center items-center">
        <div className="m-5">
          <b className="text-[36px]">Login</b>
        </div>
        <div className="flex flex-col w-1/2 items-start mt-6">
          <b className="text-[20px]">Email</b>
          <input
          onChange={handlerChange}
            type="email"
            name="email"
            id=""
            placeholder="example@email.com"
            className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3"
          />
          <br />
          <br />
          <b className="text-[20px]">Password</b>
          <input

          onChange={handlerChange}
            type="password"
            name="password"
            id=""
            placeholder="Password"
            className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3"
          />
          <b className="self-end">Forgot Password?</b>
          <br />
          <button type="submit" className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 self-center">
            Log In
          </button>
          <br />
          <b className="self-center underline">
            <Link to={"/signup"}>Register new User</Link>
          </b>

          {
            JSON.stringify(formdata)
          }
          
        </div>
      </form>
    </div>
  );
}
export default SignInPage;
