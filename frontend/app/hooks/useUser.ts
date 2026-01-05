'use client'

import { useState } from 'react'

interface User {
	id: number
	name: string
	email: string
	avatar: string
	role: 'user' | 'admin'
}

const defaultUser: User = {
	id: 0,
	name: '',
	email: '',
	avatar: '',
	role: 'user',
}

export const useUser = () => {
	const [user, setUser] = useState<User>(defaultUser)

	const LoadUser = async () => {
		try {
			// TODO: Implement API call to load user data
			// const res = await fetch('/api/auth/authenticated')
			// const data = await res.json()
			// setUser(data)
			console.log('LoadUser: API call not implemented yet')
		} catch (error) {
			setUser(defaultUser)
		}
	}

	return { LoadUser, user, setUser }
}
