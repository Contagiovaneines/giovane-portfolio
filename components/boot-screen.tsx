"use client"

import { motion } from "motion/react"

interface BootScreenProps {
  isDarkMode: boolean
  primaryColorClass: string
}

export default function BootScreen({ isDarkMode, primaryColorClass }: BootScreenProps) {
  return (
    <motion.div
      className={`flex h-full w-full flex-col items-center justify-center transition-opacity duration-1000 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      >
        <div
          className={`bg-gradient-to-r ${primaryColorClass} bg-clip-text text-5xl font-bold leading-none text-transparent`}
        >
          GIOVANE
          <br />
          DEV
        </div>
        <div
          className={`mt-4 bg-gradient-to-r ${primaryColorClass} bg-clip-text text-base font-semibold lowercase tracking-wide text-transparent`}
        >
          fullstack e mobile
        </div>
      </motion.div>
    </motion.div>
  )
}
