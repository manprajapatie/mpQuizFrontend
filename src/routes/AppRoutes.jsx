import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Questions from '../pages/Questions'

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
            </Routes>

        </>
    )
}

export default AppRoutes
