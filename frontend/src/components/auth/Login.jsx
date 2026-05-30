import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_POINT } from "../../utils/constants";
import { RadioGroup } from "../ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import Navbar from "../common/Navbar";

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading,user} =useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
       dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
        
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally{
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>
  {
    if(user){
      navigate("/");
    }
 
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border border-slate-200 rounded-2xl p-8 shadow-xl bg-white"
        >
          <h1 className="font-bold text-3xl mb-2 text-slate-900 tracking-tight text-center">Welcome Back</h1>
          <p className="text-slate-500 text-center mb-8 text-sm">Access your professional dashboard</p>

          <div className="space-y-4">
            <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abcdemail@gmail.com"
              className="focus-visible:ring-indigo-600 h-11"
            />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password"
              className="focus-visible:ring-indigo-600 h-11"
            />
            </div>
          </div>

          <RadioGroup className="flex items-center gap-8 my-8">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label>Student</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

{
loading?<Button className="w-full my-6"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>loading</Button>:
<Button type="submit" className="w-full my-8 bg-indigo-600 hover:bg-indigo-700 h-11 text-base shadow-lg shadow-indigo-100 transition-all">Login</Button>
}

          

          <p className="text-sm text-slate-600 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
