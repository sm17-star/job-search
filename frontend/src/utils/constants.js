export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";

export const USER_API_POINT=`${API_BASE_URL}/api/v1/users`;
export const JOB_API_POINT=`${API_BASE_URL}/api/v1/jobs`;
export const APPLICATION_API_POINT=`${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_POINT=`${API_BASE_URL}/api/v1/company`;
export const AI_API_POINT=`${API_BASE_URL}/api/v1/ai`;