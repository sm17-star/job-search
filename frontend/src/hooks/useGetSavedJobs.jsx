import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_POINT } from "../utils/constants";
import { setSavedJobs } from "../redux/jobSlice";

const useGetSavedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_POINT}/saved`, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedJobs();
  }, [dispatch]);
};

export default useGetSavedJobs;
