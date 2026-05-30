import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";

const filterArray = [
    {
        filterType: "Location",
        array: ["Delhi", "Bangalore", "Mumbai", "Hyderabad","Remote", "Chennai", "Pune", "Noida", "Gurgaon", "Ahmedabad"]
    },
    {
        filterType: "Category",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "Fullstack Developer", "Software Engineer", "DevOps", "Mobile Developer", "UI/UX Designer"]
    },
    {
        filterType: "Salary",
        array: ["10", "15", "20", "30", "40","60","80"]
    },
    {
        filterType: "Experience",
        array: ["0", "1", "2", "3","4","5","10"]
    },
    {
        filterType: "Skills",
        array: ["React", "Nodejs", "Python","Java","C++", "Javascript","MongoDB"]

    }
];

const FilterCard = () => {
    const searchQuery = useSelector(store => store.job.searchQuery) || [];
    const dispatch = useDispatch();

    const changeHandler = (type, value) => {
    const key = `${type}:${value}`;
    const currentQueries = Array.isArray(searchQuery) ? searchQuery : [];

    const newQuery = currentQueries.includes(key)
        ? currentQueries.filter(item => item !== key)
        : [...currentQueries, key];

    dispatch(setSearchQuery(newQuery));
};

    return (
        <div className="bg-white p-4 rounded-md shadow-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">Filter Jobs</h2>
            <hr className="border-gray-300 mb-4" />

            <div className="space-y-6">
                {filterArray.map((data) => (
                    <div key={data.filterType} className="w-full">
                        <h3 className="font-semibold text-gray-700 mb-2">{data.filterType}</h3>
                        <div className="flex flex-col space-y-2">
                           {data.array.map((item) => (
    <div key={`${data.filterType}-${item}`} className="flex items-center space-x-2">
        <Checkbox 
            id={`${data.filterType}-${item}`} 
            checked={Array.isArray(searchQuery) && searchQuery.includes(`${data.filterType}:${item}`)}
            onCheckedChange={() => changeHandler(data.filterType, item)}
        />
        <Label 
            htmlFor={`${data.filterType}-${item}`} 
            className="text-gray-600 text-sm"
        >
            {item}
        </Label>
    </div>
))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCard;
