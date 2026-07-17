import {React, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, HelpCircle, PlusCircle, Menu, X } from 'lucide-react'

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Navigation Links Data
  const navItems = [
    { name: 'Home', path: '/', icon: BookOpen },
    { name: 'Questions', path: '/AllQuestions', icon: HelpCircle },
    { name: 'Create Quiz', path: '/quiz', icon: PlusCircle, isCTA : true },
  ]


  return (
    
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-colors duration-300"
      >
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 sm:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="rounded-lg bg-indigo-600 p-2 text-white shadow-md shadow-indigo-100 dark:shadow-none"
            >
              <BookOpen className="h-5 w-5" />
            </motion.div>
            <span className="font-serif text-xl font-bold tracking-tight text-slate-800 dark:text-white transition-colors duration-200">
              MP<span className="text-blue-400 font-sans">QUIZ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              if (item.isCTA) {
                return (
                  <Link key={item.path} to={item.path} className="ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white  hover:bg-indigo-700 hover:shadow-md transition-all duration-100 dark:shadow-none"
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </motion.button>
                  </Link>
                )
              }

              return (
                <Link key={item.path} to={item.path} className="relative px-4 py-2 text-sm font-medium">
                  <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    }`}>
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </span>

                  {/* Active Link */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 z-0 rounded-full bg-indigo-50 dark:bg-slate-800/60"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95"
            >
              <div className="space-y-1 px-4 pb-4 pt-2 shadow-inner">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-all ${item.isCTA
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 mt-4'
                          : isActive
                            ? 'bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default Header
