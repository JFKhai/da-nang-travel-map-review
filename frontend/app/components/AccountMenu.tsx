'use client'

import { motion } from 'framer-motion'
import { useUser } from '../hooks/useUser'
import {
	PiHardDrivesFill,
	PiMapPinFill,
	PiSignOutBold,
	PiUserFill,
} from 'react-icons/pi'
import Link from 'next/link'

interface AccountMenuProps {
	className?: string
	onClose: () => void
}

const AccountMenu: React.FC<AccountMenuProps> = ({ className = '', onClose }) => {
	const { user, setUser } = useUser()

	const handleSignOut = async () => {
		// TODO: Implement sign out logic
		if (confirm('Are you sure you want to sign out?')) {
			try {
				// await fetch('/api/auth/logout')
				setUser({
					id: 0,
					name: '',
					email: '',
					avatar: '',
					role: 'user',
				})
				onClose()
				console.log('User signed out')
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<motion.div
			className={`shadow-lg w-70 select-none rounded-lg bg-white px-3 pb-2 pt-4 ${className}`}
			initial={{ opacity: 0, y: '100%' }}
			animate={{ opacity: 1, y: '105%' }}
			exit={{ opacity: 0, y: '100%' }}
		>
			<p className="mb-1 line-clamp-1 select-text px-2 text-right text-sm text-blue-600">
				{user.email}
			</p>
			<Link
				className="flex cursor-pointer items-center rounded py-2 pl-2 pr-1 transition-all hover:bg-gray-100 active:bg-gray-200"
				href="/account"
				onClick={onClose}
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl">
					<PiUserFill />
				</div>
				<p className="ml-4 flex-1 text-sm font-semibold">My Account</p>
			</Link>
			<Link
				className="flex cursor-pointer items-center rounded py-2 pl-2 pr-1 transition-all hover:bg-gray-100 active:bg-gray-200"
				href="/account?tab=1"
				onClick={onClose}
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl">
					<PiMapPinFill />
				</div>
				<p className="ml-4 flex-1 text-sm font-semibold">
					Favorite Destinations
				</p>
			</Link>
			<Link
				className="flex cursor-pointer items-center rounded py-2 pl-2 pr-1 transition-all hover:bg-gray-100 active:bg-gray-200"
				href="/account?tab=2"
				onClick={onClose}
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl">
					<PiHardDrivesFill />
				</div>
				<p className="ml-4 flex-1 text-sm font-semibold">My Blogs</p>
			</Link>
			<div className="my-1 h-px w-full bg-gray-200"></div>
			<button
				className="flex w-full items-center rounded py-2 pl-2 pr-1 transition-all hover:bg-gray-100 active:bg-gray-200"
				onClick={handleSignOut}
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl">
					<PiSignOutBold />
				</div>
				<p className="ml-4 flex-1 text-left text-sm font-semibold">Sign Out</p>
			</button>
		</motion.div>
	)
}

export default AccountMenu
