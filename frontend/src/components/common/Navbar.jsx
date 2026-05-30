import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_POINT } from "../../utils/constants";
import { setUser } from "../../redux/authSlice";


const Navbar = () => {
  const {user}=useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

   const logoutHandler = async()=>{
    try {
      const res=await axios.get(`${USER_API_POINT}/logout`,{withCredentials:true});
      if(res.data.success){
        dispatch(setUser(null));
        navigate("/")
        toast.success(res.data.message);
      }
      
    } catch (error) {
   console.log(error);
    }
   }
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900">
          Job<span className="text-indigo-600">Board</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-12">
          <ul className="hidden md:flex font-medium items-center gap-8 text-slate-600 text-sm uppercase tracking-wide">
            {
              user && user.role ==="recruiter"?(
                <>
                 <li className="hover:text-indigo-600 transition-colors cursor-pointer"><Link to="/admin/companies">Company</Link></li>
                 <li className="hover:text-indigo-600 transition-colors cursor-pointer"><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ):(
                <>
                 <li className="hover:text-indigo-600 transition-colors cursor-pointer"><Link to="/">Home</Link></li>
                 <li className="hover:text-indigo-600 transition-colors cursor-pointer"><Link to="/browse">Browse</Link></li>
                 {user && user.role === "student" && (
                   <li className="hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1">
                     <Sparkles size={16} className="text-indigo-600" />
                     <Link to="/aiAnalyzer">AI Analyzer</Link>
                   </li>
                 )}
                </>
              )
            }
           
          </ul>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login"><Button variant="ghost" className="hover:bg-slate-100">Login</Button></Link>
              <Link to="/signup"> <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md px-6 transition-all">Signup</Button></Link>
             
            </div>
          ) : (
            <Popover className="z-50">
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

             <PopoverContent className="w-80 bg-white shadow-lg border z-50">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-slate-500">
                     {user?.profile?.intro}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mt-4 text-slate-700">
                  {
                    user && user.role==="student" && (
 <div className="flex items-center gap-2 cursor-pointer">
                    <User2 size={18} />
                    <Button variant="link" asChild><Link to="/profile">View Profile</Link></Button>
                  </div>
                    )
                  }
                 
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut size={18} />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar; 
