import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorToast, successToast } from "../../Toast";
import { useEffect, useState } from "react";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user role
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
      case 'govt':
        navigate('/govt');
        break;
      default:
        break;
    }
  }, [userRole, navigate]);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { email, password };
      const response = await axios.post('https://opengov-server.onrender.com/auth/login', data);
      const role = response.data.result?.role;

      if (role === 'admin') {
        localStorage.setItem('admin-id', response.data.result._id);
      } else if (role === 'company') {
        localStorage.setItem('company-id', response.data.result._id);
      } else if (role === 'govt') {
        localStorage.setItem('govt-id', response.data.result._id);
        localStorage.setItem('level', response.data.result.level);
      } else if (role === 'citizen') {
        localStorage.setItem('citizen-id', response.data.result._id);
      }

      setUserRole(role);

      if (!role) {
        errorToast('Missing or invalid role in response');
      }

    } catch (error) {
      errorToast(error.response?.data?.message || 'Login failed');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col w-full h-full border-[2px] border-[#213361] rounded-[20px] m-3 text-center items-center">
      <div className="m-5">
        <b className="text-[36px]">Login</b>
      </div>
      <form onSubmit={handlerSubmit} className="flex flex-col w-1/2 items-start mt-6">
        <b className="text-[20px]">Email</b>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3"
        />
        <br />
        <br />
        <b className="text-[20px]">Password</b>
        <div className="relative w-full">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border-[2px] border-[#213361] rounded-lg w-full h-9 pl-3"
          />
          <span
            className="absolute right-2 top-1 cursor-pointer text-2xl"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>
        <br />
        <button type="submit" className="bg-[#213361] text-white rounded-lg w-auto h-auto p-3 self-center">
          Log In
        </button>
        <br />
        <b className="self-center underline"><Link to={'/signup'}>Register new User</Link></b>
      </form>
    </div>
  );
}

export default SignInPage;
