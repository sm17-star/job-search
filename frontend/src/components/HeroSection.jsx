import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center">
            <div className="flex flex-col gap-6 my-16 px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                    Search, Apply & <br /> Get Your <span className="text-indigo-600">Dream Jobs</span>
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                    Discover thousands of job opportunities from top companies. Your next big career move starts here.
                </p>
                <div className="flex justify-center mt-4">
                    <Button 
                        onClick={() => navigate("/browse")} 
                        className="rounded-full px-10 py-6 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200 transition-all font-semibold"
                    >
                        Explore All Jobs
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection