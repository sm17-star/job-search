import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import Job from "./components/Job";
import Profile from "./components/Profile";
import Browse from "./components/Browse";
import JobDesc from "./components/JobDesc";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanyDetails from "./components/admin/CompanyDetails";
import AiAnalyzer from "./components/AiAnalyzer";
import AdminJobs from "./components/admin/AdminJobs";
import CreateJob from "./components/admin/CreateJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"/description/:id",
    element:<JobDesc/>,
  }
  ,
  {
path:"/browse",
    element:<Browse/>,
  },
  {
path:"/profile",
    element:<Profile/>,
  },
  {
    path: "/aiAnalyzer",
    element: <AiAnalyzer />
  },
  //admin
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
   {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanyDetails/></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
   {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><CreateJob/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
  {
    path: "*",
    element: <div className="flex items-center justify-center h-screen"><h1>404 - Page Not Found</h1></div>
  }
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
