'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode
}

const buttonVariants = {
	hover: {
		scale: 1.03,
	},
	tap: {
		scale: 0.93,
		opacity: 0.85,
	},
}

export const Button: React.FC<ButtonProps> = ({
	children,
	className = '',
	onClick,
	disabled,
	...props
}) => {
	return (
		<motion.button
			className={`flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
			whileTap={disabled ? {} : 'tap'}
			variants={buttonVariants}
			transition={{ duration: 0.1 }}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</motion.button>
	)
}
