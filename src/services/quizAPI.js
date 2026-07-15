
import { handleRequest } from "../utils/errorHandlingWrapper"
import axiosInstance from "./axiosInstance"
import { ENDPOINTS } from "./endpoints"

//Get All the Questions

export const getAllQuestions = () => handleRequest(() => axiosInstance.get(ENDPOINTS.GET_ALL_QUESTIONS()));

//Create Random Quiz Questions with specific input

export const createQuizQuestions = (category, quesQuantity, title) =>
    handleRequest(() =>
        axiosInstance.post(ENDPOINTS.CREATE_QUIZ(category, quesQuantity, title)))

//Get Quiz Question

export const getQuizQuestions = (quizId) =>
    handleRequest(() =>
        axiosInstance.get(ENDPOINTS.GET_QUIZ_QUESTIONS(quizId))
    );

// Submit Quiz
export const submitQuiz = (id, answers) =>
    handleRequest(() =>
        axiosInstance.post(
            ENDPOINTS.SUBMIT_QUIZ(id),
            answers
        )
    );