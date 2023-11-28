'use client'

import { ReactNode } from 'react'

import { motion } from 'framer-motion'

interface MotionWrapper {
  children: ReactNode
  initial: any
  animate: any
  transition: any
  exit: any
  style: any
}

export const MotionWrapper = ({
  children,
  initial,
  animate,
  transition,
  exit,
  style,
}: MotionWrapper) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      exit={exit}
      style={style}
    >
      {children}
    </motion.div>
  )
}
