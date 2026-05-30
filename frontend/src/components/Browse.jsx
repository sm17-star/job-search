import React, { useEffect, useState } from 'react'
import Navbar from "./common/Navbar"
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import FilterCard from './FilterCard' 
import { setSearchQuery } from '../redux/jobSlice'
import useGetAllJobs from '../hooks/useGetAllJobs'

const Browse=()=>{
     useGetAllJobs();
     const dispatch = useDispatch();
    const {allJobs, searchQuery} = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const [localQuery, setLocalQuery] = useState("");

    
    useEffect(() => {
        if (typeof searchQuery === 'string') {
            setLocalQuery(searchQuery);
        }
    }, [searchQuery]);

    const changeHandler = (e) => {
        const val = e.target.value;
        setLocalQuery(val);
        dispatch(setSearchQuery(val)); 
    };

    useEffect(() => {
        const jobsToFilter = allJobs || [];
        const queries = Array.isArray(searchQuery) ? searchQuery : (searchQuery ? [searchQuery] : []);

        if (queries.length > 0) {
            const filtered = jobsToFilter.filter((job) => {
                // .every ensures that the job matches ALL active filters AND logic
                return queries.every(query => {
                    let [type, val] = query.includes(':') ? query.split(':') : [null, query];
                    val = val.toLowerCase().trim();
                    
                    if (val === "") return true;

                    const isNumber = !isNaN(val) && val !== '';
                    const numVal = Number(val);

                    // Handle structured filters from FilterCard
                    if (type === "Salary") return job?.salary >= numVal;
                    if (type === "Experience") return job?.experience >= numVal;
                    if (type === "Location") return (job?.location?.toLowerCase() || "").includes(val);
                    if (type === "Category") return (job?.jobTitle?.toLowerCase() || "").includes(val); // Simple includes for category
                    if (type === "Skills") return job?.requirements?.some(req => req.toLowerCase().includes(val));

                  
                    return (job?.jobTitle?.toLowerCase() || "").includes(val)
                        || (job?.description?.toLowerCase() || "").includes(val)
                        || (job?.location?.toLowerCase() || "").includes(val)
                        || (job?.requirements?.some(req => req.toLowerCase().includes(val)) || false)
                        || (isNumber && job?.salary >= numVal)
                        || (isNumber && job?.experience >= numVal);
                });
            });
            setFilterJobs(filtered);
        } else {
            setFilterJobs(jobsToFilter);
        }
    }, [allJobs, searchQuery]);

    // Cleanup effect for searchQuery when component unmounts
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery([]));
        }
    }, [dispatch]);

    useEffect(()=>{
        return()=>{
            dispatch(setSearchQuery([]));
        }
    },[])
    
    return(
   
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-center mb-12'>
                    <div className='relative w-full max-w-2xl'>
                        <Input
                            type="text"
                            placeholder="Search by title, skills, or location..."
                            value={localQuery}
                            onChange={changeHandler}
                            className="pl-12 h-14 shadow-lg rounded-full border-slate-200 focus-visible:ring-indigo-500 text-lg"
                        />
                        <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6' />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-8'>
                    {/* Sidebar Filters */}
                    <div className='w-full md:w-1/4 lg:w-1/5'>
                        <FilterCard />
                    </div>

                    {/* Main Content */}
                    <div className='flex-1'>
                        <h1 className='font-bold text-2xl mb-6 text-slate-800'>
                            Results found ({filterJobs.length})
                        </h1>
                        
                        {filterJobs.length === 0 ? (
                            <div className='text-center py-20 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300'>
                                No jobs found matching your criteria. Try adjusting your search or filters.
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                                {filterJobs.map((job) => (
                                    <Job key={job._id} job={job}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default Browse