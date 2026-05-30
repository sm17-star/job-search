import React, { useState } from 'react'
import Navbar from './common/Navbar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import axios from 'axios'
import { AI_API_POINT } from '../utils/constants'
import { toast } from 'sonner'
import { Loader2, Sparkles, CheckCircle2, AlertCircle, Trophy, FileText, ChevronRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleReport } from '../redux/aiSlice'

const AiAnalyzer = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        file: null,
        selfDescription: "",
        jobDescription: ""
    });

    const dispatch = useDispatch();
    const { singleReport } = useSelector(store => store.ai);

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.file && !input.selfDescription.trim()) {
            toast.error("Please provide either a summary or upload your resume.");
            return;
        }
        if (!input.jobDescription) {
            toast.error("Job description is required to perform analysis.");
            return;
        }

        const formData = new FormData();
        if (input.file) {
            formData.append("file", input.file);
        }
        formData.append("selfDescription", input.selfDescription);
        formData.append("jobDescription", input.jobDescription);

        try {
            setLoading(true);
            const res = await axios.post(`${AI_API_POINT}/aiAnalyzer`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.analyzedReport) {
                dispatch(setSingleReport(res.data.analyzedReport));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />
            <div className='max-w-6xl mx-auto mt-12 px-4'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    
                    {/* Input Form Section */}
                    <div className='lg:col-span-5'>
                        <div className='bg-white border border-slate-200 p-8 rounded-3xl shadow-sm sticky top-24'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='p-2 bg-indigo-100 rounded-xl text-indigo-600'>
                                    <Sparkles size={24} />
                                </div>
                                <h1 className='font-bold text-2xl text-slate-900'>Resume Analyzer</h1>
                            </div>
                            
                            <form onSubmit={submitHandler} className='space-y-6'>
                                <div className='space-y-2'>
                                    <Label htmlFor="jobDescription" className="font-semibold text-slate-700 flex items-center gap-2">
                                        Target Job Description <span className='text-red-500'>*</span>
                                    </Label>
                                    <Textarea
                                        id="jobDescription"
                                        name="jobDescription"
                                        required
                                        value={input.jobDescription}
                                        onChange={changeEventHandler}
                                        placeholder="Paste the requirements from the job posting..."
                                        className="h-40 border-slate-200 focus-visible:ring-indigo-500 rounded-xl resize-none"
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label htmlFor="selfDescription" className="font-semibold text-slate-700">
                                        Your Summary {!input.file && <span className='text-red-500'>*</span>}
                                    </Label>
                                    <Textarea
                                        id="selfDescription"
                                        name="selfDescription"
                                        value={input.selfDescription}
                                        onChange={changeEventHandler}
                                        placeholder="Add context about your career goals..."
                                        className="h-24 border-slate-200 focus-visible:ring-indigo-500 rounded-xl resize-none"
                                    />
                                </div>

                                <div className='space-y-2'>
                                    <Label className="font-semibold text-slate-700">
                                        Resume PDF {!input.selfDescription.trim() && <span className='text-red-500'>*</span>}
                                    </Label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                                                <FileText className="w-8 h-8 mb-3 opacity-50" />
                                                <p className="text-sm font-medium">{input.file ? input.file.name : "Click to upload PDF"}</p>
                                            </div>
                                            <input type="file" accept="application/pdf" className="hidden" onChange={changeFileHandler} />
                                        </label>
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={loading}
                                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-7 rounded-2xl transition-all shadow-lg hover:shadow-indigo-200 text-lg'
                                >
                                    {loading ? (
                                        <><Loader2 className='mr-2 h-6 w-6 animate-spin' /> Generating Report...</>
                                    ) : (
                                        <span className='flex items-center gap-2'>Analyse Now <ChevronRight size={20}/></span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>

                    
                    <div className='lg:col-span-7'>
                        {!singleReport && !loading && (
                            <div className='h-full min-h-[500px] flex flex-col items-center justify-center text-center p-10 bg-white border border-slate-200 border-dashed rounded-3xl'>
                                <div className='w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6'>
                                    <Sparkles className='text-slate-300' size={40} />
                                </div>
                                
                                <p className='text-slate-400 mt-2 max-w-sm'>Fill out the details on the left and upload your resume to see the AI analysis here.</p>
                            </div>
                        )}

                        {singleReport && (
                            <div className='bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500'>
                                <div className='p-8 md:p-10'>
                                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10'>
                                        <div>
                                            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3'>
                                                <Sparkles size={12}/> Analysis Result
                                            </div>
                                            <h2 className='font-bold text-3xl text-slate-900'>{singleReport.title}</h2>
                                        </div>
                                        <div className='relative flex flex-col items-center justify-center h-32 w-32 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner'>
                                            <div className={`text-4xl font-black ${singleReport.matchScore >= 80 ? 'text-emerald-600' : singleReport.matchScore >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                                                {singleReport.matchScore}%
                                            </div>
                                            <div className='text-[10px] uppercase font-bold text-slate-400 tracking-tighter mt-1'>Compatibility</div>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-10'>
                                        <div className='bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl'>
                                            <h3 className='font-bold text-emerald-800 mb-4 flex items-center gap-2'>
                                                <CheckCircle2 size={18} /> Found Skills
                                            </h3>
                                            <div className='flex flex-wrap gap-2'>
                                                {singleReport.matchingSkills?.length > 0 ? singleReport.matchingSkills.map((skill, idx) => (
                                                    <span key={idx} className='bg-white text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium border border-emerald-100 shadow-sm'>
                                                        {skill}
                                                    </span>
                                                )) : <span className='text-slate-400 text-sm'>No matching skills detected.</span>}
                                            </div>
                                        </div>

                                        <div className='bg-rose-50/50 border border-rose-100 p-6 rounded-2xl'>
                                            <h3 className='font-bold text-rose-800 mb-4 flex items-center gap-2'>
                                                <AlertCircle size={18} /> Missing Skills
                                            </h3>
                                            <div className='flex flex-wrap gap-2'>
                                                {singleReport.missingSkills?.length > 0 ? singleReport.missingSkills.map((skill, idx) => (
                                                    <span key={idx} className='bg-white text-rose-700 px-3 py-1 rounded-lg text-sm font-medium border border-rose-100 shadow-sm'>
                                                        {skill}
                                                    </span>
                                                )) : <span className='text-slate-400 text-sm'>No missing skills detected.</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='space-y-6'>
                                        <h3 className='font-bold text-xl text-slate-900 border-b border-slate-100 pb-4'>AI Strategic Insights</h3>
                                        <div className='space-y-4'>
                                            {singleReport.aiFeedback?.map((item, idx) => (
                                                <div key={idx}>
                                                 
                                                    <p className='text-xl text-indigo-700 mb-4 leading-relaxed bg-slate-100 p-4 rounded-2xl border border-indigo-100'>{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiAnalyzer