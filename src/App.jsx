import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'

function App() {


  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
