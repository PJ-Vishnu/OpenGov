import { Link, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import { errorToast, successToast } from "../../Toast";
import { useState } from "react";
function SignInPage() {


    //  fetch
    //   axios

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()


    const handlerSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const data = {
            email,
            password,
          };
    
          const response = await axios.post('http://localhost:4000/auth/login', data);
          const userRole = response.data.result?.role; // Use optional chaining for safety
    
          if (!userRole) {
            errorToast('Missing or invalid role in response');
            return; // Handle missing or invalid role
          }
    
          switch (userRole) {
            case 'admin':
              navigate('/admin');
              break;
            case 'company':
              navigate('/company');
              break;
            case 'citizen':
              navigate('/citizen');
              break;
            case 'govt': // Add your other roles here
              navigate('/govt');
              break;
            default:
              errorToast('Unexpected role in response');
              console.error('Unexpected role:', userRole); // Log for debugging
              break;
          }
        } catch (error) {
          errorToast(error.response.data.message || 'Login failed');
        }
      };



    return (
        <div className="flex flex-col w-full h-full border-[2px] border-[#213361] rounded-[20px] m-3 text-center items-center">
            <div className="m-5">
                <b className="text-[36px]">Login</b>
            </div>
            <form onSubmit={handlerSubmit} className="flex flex-col w-1/2 items-start mt-6">
                <b className="text-[20px]"  >Email</b>
                <input type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} id="" placeholder="example@email.com" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <br />
                <br />
                <b className="text-[20px]">Password</b>
                <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} id="" placeholder="Password" className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3" />
                <b className="self-end">Forgot Password?</b>
                <br />
                <button type="submit" className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 self-center">Log In</button>
                <br />
                <b className="self-center underline"><Link to={'/signup'}>Register new User</Link></b>
            </form>
        </div>
    )
}
export default SignInPage