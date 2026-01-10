import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { User } from 'next-auth'
import envConfig from './config/env.config'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      full_name: string
      token: string
    }
  }

  interface User {
    id: string
    email: string
    full_name: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    email?: string
    full_name?: string
    accessToken?: string
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call API directly (server-side, no axios client needed)
          const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            console.error('Login failed:', response.statusText)
            return null
          }

          const apiResponse = await response.json()

          // API returns { success, message, data: { token, user } }
          if (!apiResponse.success || !apiResponse.data) {
            console.error('Login failed: Invalid response structure')
            return null
          }

          const { token, user } = apiResponse.data

          return {
            id: user.id.toString(),
            email: user.email,
            full_name: user.full_name,
            token: token,
          } as User
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.full_name = user.full_name
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.full_name = token.full_name as string
        session.user.token = token.accessToken as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
