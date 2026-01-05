'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import {
  PiCaretDownBold,
  PiHouseBold,
  PiCompassBold,
  PiMapTrifoldBold,
  PiArticleBold,
  PiCalendarBlankBold,
  PiTableBold,
} from 'react-icons/pi'
import { useUser } from '../hooks/useUser'
import { Button } from './Button'
import AccountMenu from './AccountMenu'

const NavItems = [
	{
		name: 'Home',
		icon: PiHouseBold,
		path: '/',
	},
	{
		name: 'Destination',
		icon: PiCompassBold,
		path: '/destination',
	},
	{
		name: 'Map',
		icon: PiMapTrifoldBold,
		path: '/map',
	},
	{
		name: 'Blog',
		icon: PiArticleBold,
		path: '/blog',
	},
	{
		name: 'Schedule',
		icon: PiCalendarBlankBold,
		path: '/schedule',
	},
	{
		name: 'Manage',
		icon: PiTableBold,
		path: '/manage',
	},
]

interface NavbarProps {
	onSignUp: () => void
	onLogin: () => void
}
const Navbar: React.FC<NavbarProps> = ({ onSignUp, onLogin }) => {
	const pathname = usePathname()
	const firstPath = '/' + pathname.split('/')[1]
	const [hidden, setHidden] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [isHome, setIsHome] = useState(firstPath === '/')
	const { scrollY } = useScroll()

	useMotionValueEvent(scrollY, 'change', (latest) => {
		const previous = scrollY.getPrevious() as number
		if (latest > previous && latest > 100) setHidden(true)
		else setHidden(false)
		
		// Update isHome based on scroll position
		if (typeof window !== 'undefined') {
			const windowHeight = window.innerHeight
			const scrolledOnePage = latest >= windowHeight
			setIsHome(scrolledOnePage ? false : firstPath === '/')
		}
	})

	const { user } = useUser()

	return (
		<motion.nav
			variants={{
				visible: { y: 0 },
				hidden: { y: '-100%' },
			}}
			animate={hidden ? 'hidden' : 'visible'}
			transition={{ duration: 0.35, ease: 'easeInOut' }}
			className={`fixed left-0 top-0 z-10 flex h-12 w-full justify-center ${
				isHome ? 'bg-transparent' : 'bg-bgCol-2 shadow-md'
			}`}
		>
			<div className="my-auto flex h-10 w-full items-center justify-between xl:max-w-7xl px-4">
				<div className="h-full w-50">
					<Link
						href="/"
						className={`cursor-pointer select-none text-xl font-bold leading-10 ${
							isHome ? 'text-primary-3' : 'text-primary-1'
						}`}
					>
						Danang Travel
					</Link>
				</div>
				<div className="h-full">
					<ul className="flex h-full gap-1">
						{NavItems.map(
							(item, index) =>
								(item.name !== 'Manage' ||
									(item.name === 'Manage' && user.role === 'admin')) && (
									<li key={index}>
										<Link
											href={item.path}
											className={`relative flex min-w-30 items-center justify-center gap-2 px-3 text-base rounded-lg transition-all ${
												firstPath === item.path
													? isHome
														? 'text-primary-3'
														: 'text-primary-1'
													: isHome
														? 'text-txtCol-4'
														: 'text-txtCol-3'
											} ${isHome ? 'hover:bg-black/25' : 'hover:bg-black/5'}`}
										>
											<item.icon />
											<p
												className={`${
													firstPath === item.path
														? isHome
															? 'text-white'
															: 'text-txtCol-1'
														: isHome
															? 'text-txtCol-4'
															: 'text-txtCol-3'
												} text-sm font-semibold leading-10`}
											>
												{item.name}
											</p>
												{firstPath === item.path && (
													<motion.span
														className="absolute -bottom-1 h-0.5 w-full bg-primary-2"
														layoutId="underline"
														transition={{ duration: 0.2 }}
													/>
												)}
										</Link>
									</li>
								),
						)}
					</ul>
				</div>
				{user.id !== 0 ? (
					<div className="relative flex w-50 items-center justify-end gap-4">
						<p
							className={`text-sm font-semibold ${isHome ? 'text-txtCol-4' : ''}`}
						>
							{user.name}
						</p>
						<button
							className="relative h-8 w-8 rounded-full"
							onClick={() => setShowMenu(!showMenu)}
						>
							<img
								className="h-full w-full rounded-full object-cover"
								src={user.avatar}
								alt="User Avatar"
							/>
							<span className={`absolute -bottom-0.75 -right-0.75 rounded-full ${isHome ? '' : 'bg-bgCol-2'}`}>
								<div className="mx-0.5 my-0.5 rounded-[inherit] bg-gray-300 px-px py-px text-xs">
									<PiCaretDownBold />
								</div>
							</span>
						</button>
						<AnimatePresence>
							{showMenu && (
								<AccountMenu
									className="absolute -bottom-2.5 right-0"
									onClose={() => setShowMenu(false)}
								/>
							)}
						</AnimatePresence>
					</div>
				) : (
					<div className="flex items-center justify-end gap-4">
						<Button
							className={`text-sm font-semibold ${isHome ? 'text-txtCol-4 hover:text-primary-3' : 'text-txtCol-1 hover:text-primary-1'}`}
							onClick={onSignUp}
						>
							Sign up
						</Button>
						<Button
							className={`w-23 bg-primary-2 text-sm font-semibold text-white hover:bg-primary-1 ${
								isHome ? 'opacity-80' : ''
							}`}
							onClick={onLogin}
						>
							Login
						</Button>
					</div>
				)}
			</div>
		</motion.nav>
	)
}

export default Navbar
