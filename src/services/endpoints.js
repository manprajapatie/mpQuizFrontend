export const ENDPOINTS = {

    //get All Questions
    GET_ALL_QUESTIONS: () => `/question/allQuestions`,

    //get Quiz Question and option
    CREATE_QUIZ: (category, quesQuantity, title) => `/quiz/create?category=${category}&numQ=${quesQuantity}&title=${title}`,

}