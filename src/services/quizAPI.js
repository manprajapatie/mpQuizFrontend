
import { handleRequest } from "../utils/errorHandlingWrapper"
import axiosInstance from "./axiosInstance"
import { ENDPOINTS } from "./endpoints"

//Get All the Questions

export const getAllQuestions = () => handleRequest(() => axiosInstance.get(ENDPOINTS.GET_ALL_QUESTIONS()));

//Get Quiz Questions and option

export const createQuizQuestions = (category, quesQuantity, title) => handleRequest(() => axiosInstance.post(ENDPOINTS.CREATE_QUIZ(category, quesQuantity, title)))