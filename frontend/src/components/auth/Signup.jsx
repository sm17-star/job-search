import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_POINT } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: null,
  });
 const {loading,user} =useSelector(store=>store.auth);
 const dispatch=useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_POINT}/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
         
       
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  };
useEffect(()=>
  {
    if(user){
      navigate("/");
    }
  },[]);
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg border border-slate-200 rounded-2xl p-8 shadow-xl bg-white"
        >
          <h1 className="font-bold text-3xl mb-2 text-slate-900 tracking-tight text-center">Create Account</h1>
          <p className="text-slate-500 text-center mb-8 text-sm">Join our network of professionals</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label>Fullname</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="enter fullname"
              className="focus-visible:ring-indigo-600 h-11"
            />
            </div>

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

            <div className="space-y-2">
            <Label>PhoneNo</Label>
            <Input
              type="text"
              value={input.phone}
              name="phone"
              onChange={changeEventHandler}
              placeholder="enter phone"
              className="focus-visible:ring-indigo-600 h-11"
            />
            </div>

            <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="enter password"
              className="focus-visible:ring-indigo-600 h-11"
            />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 py-4">
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">Select Role</Label>
              <RadioGroup className="flex items-center gap-6 mt-2">
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
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Label className="font-semibold text-slate-700">Profile Picture</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer text-sm h-11 file:bg-indigo-50 file:text-indigo-700 file:border-0 file:rounded-full file:px-4 file:mr-4 hover:file:bg-indigo-100 transition-all"
              />
            </div>
          </div>

          {
loading?<Button className="w-full my-6"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>loading</Button>:
<Button type="submit" className="w-full my-8 bg-indigo-600 hover:bg-indigo-700 h-12 text-lg shadow-lg shadow-indigo-100 transition-all">Create Account</Button>
}

          <p className="text-sm text-slate-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
