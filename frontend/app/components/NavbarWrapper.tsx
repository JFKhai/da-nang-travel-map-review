'use client'

import Navbar from './Navbar'

export default function NavbarWrapper() {
	const handleSignUp = () => {
		console.log('Sign up clicked')
		// TODO: Implement sign up modal
	}

	const handleLogin = () => {
		console.log('Login clicked')
		// TODO: Implement login modal
	}

	return <Navbar onSignUp={handleSignUp} onLogin={handleLogin} />
}
