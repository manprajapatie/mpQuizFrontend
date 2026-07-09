
import { handleRequest } from "../utils/errorHandlingWrapper"
import axiosInstance from "./axiosInstance"
import { ENDPOINTS } from "./endpoints"

//Get All the Questions

export const getAllQuestions = () => handleRequest(() => axiosInstance.get(ENDPOINTS.GET_ALL_QUESTIONS()));