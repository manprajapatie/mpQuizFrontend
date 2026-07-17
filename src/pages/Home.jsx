import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Sparkles, BrainCircuit } from 'lucide-react'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  }
  return (
    <>
      <div className="relative min-h-[calc(100vh-4rem)] bg-linear-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-300 overflow-hidden">

        {/* Background */}
        <div className="absolute top-0 right-0 -z-10 h-125 w-125 rounded-full bg-indigo-400/10 blur-[120px] dark:bg-indigo-600/5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 h-125 w-125 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-600/5 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Left Side: Content Area */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left space-y-6 max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 px-4 py-1.5 text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300"
            >
              <Sparkles className="h-4 w-4" />
              <span>Train Your Brain Daily</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Master New Skills, <br />
              <span className="bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent font-sans">
                One Quiz At A Time
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Create fully customized tests, explore community challenges, and track your intellectual growth. Dive right in or start engineering your own quiz arena today.
            </motion.p>

            {/* Navigation Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start pt-2"
            >
              <Link to="/quiz" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all duration-200"
                >
                  Create a Quiz
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link to="/AllQuestions" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(241, 245, 249, 1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:text-slate-800 px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200  transition-all duration-200"
                >
                  Browse Questions
                </motion.button>
              </Link>
            </motion.div>

            {/* Quick Social Proof */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 border-t border-slate-200/60 dark:border-slate-800/60 pt-8 mt-4 text-center lg:text-left max-w-md mx-auto lg:mx-0"
            >
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">10k+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Quizzes Taken</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">500+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Questions</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">99%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Success Rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section: Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.3 }}
            className="flex-1 relative w-full max-w-md lg:max-w-none flex justify-center items-center"
          >
            {/* Floating Card Over Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md dark:bg-slate-900/90 p-4 shadow-xl border border-slate-100 dark:border-slate-800"
            >
              <div className="rounded-xl bg-amber-500 p-2.5 text-white">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Performer</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white">Keep Climbing!</p>
              </div>
            </motion.div>

            {/* Main Visual Frame */}
            <div className="relative aspect-4/5 w-full max-w-105 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group">
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              <img
                src="https://images.pexels.com/photos/18015007/pexels-photo-18015007.jpeg"
                alt="Creative abstract shapes matching quiz vibes"
                className="h-full w-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Second Floating Element */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-4 -right-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md dark:bg-slate-900/90 p-4 shadow-xl border border-slate-100 dark:border-slate-800"
            >
              <div className="rounded-xl bg-indigo-600 p-2.5 text-white">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Active Evaluation</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </>
  )
}

export default Home
