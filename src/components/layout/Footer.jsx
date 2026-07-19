import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Heart } from 'lucide-react'

const Footer = () => {

  const currentYear = new Date().getFullYear()

  // Social links data
  const socialLinks = [
    { name: "Github", href: '#', label: 'GitHub' },
    { name: "Twitter", href: '#', label: 'Twitter' },
    { name: "Linkedin", href: '#', label: 'LinkedIn' },
  ]

  // Navigation column data
  const footerLinks = {
    explore: [
      { name: 'Home', path: '/' },
      { name: 'All Questions', path: '/AllQuestions' },
      { name: 'Create Quiz', path: '/quiz' },
    ],
    legal: [
      { name: 'Terms of Service', path: '#' },
      { name: 'Privacy Policy', path: '#' },
    ]
  }
  return (
    <>
      <footer className="relative border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">

          {/* Top Section: Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">

            {/* Brand Column */}
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="font-serif text-lg font-bold tracking-tight text-slate-800 dark:text-white">
                  Quiz<span className="text-indigo-600 font-sans">Craft</span>
                </span>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                Empowering learners and creators to test their knowledge, build clean assessments, and grow intellectually every day.
              </p>
            </div>

            {/* Explore Links Column */}
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wider uppercase mb-3">
                Explore
              </h3>
              <ul className="space-y-2">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links Column */}
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wider uppercase mb-3">
                Legal
              </h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Copyright & Socials */}
          <div className="mt-8 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Copyright text */}
            <p className="text-xs text-slate-400 dark:text-slate-500 order-2 sm:order-1 flex items-center gap-1 text-center sm:text-left">
              <span>&copy; {currentYear} QuizCraft. Built with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="inline-block"
              >
                <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
              </motion.span>
              <span>for developers everywhere.</span>
            </p>

            {/* Animated Social names */}
            <div className="flex items-center gap-4 order-1 sm:order-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-slate-200/50 p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                   {social.name}
                  </motion.a>
                )
              })}
            </div>

          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer
