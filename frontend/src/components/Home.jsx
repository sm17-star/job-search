import React, { useEffect } from "react"

import HeroSection from "./HeroSection";
import Category from "./Category";
import Content from "./Content";
import Footer from "./Footer";
import Navbar from "./common/Navbar";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";




const Home = () => {
    useGetAllJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.role === "recruiter") {
            navigate("/admin/companies");
        }
    }, [])

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12 md:space-y-20">
                <HeroSection />
                <Category />
                <Content />
            </main>
            <Footer />
        </div>
    );
}

export default Home