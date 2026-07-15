import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Questions from '../pages/Questions'
import QuizCreation from '../pages/QuizCreation'
import StartQuiz from '../pages/StartQuiz'

const AppRoutes = () => {
    return (
        <>

            <Routes>
                <Route
                    path='/'
                    element={<Home />}
                />
                <Route
                    path='/AllQuestions'
                    element={<Questions />}
                />
                <Route
                    path='/quiz'
                    element={<QuizCreation />}
                />
                <Route
                    path='/quiz/:id'
                    element={<StartQuiz />}
                />
            </Routes>

        </>
    )
}

export default AppRoutes
