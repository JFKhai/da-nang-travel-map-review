import { NextRequest, NextResponse } from 'next/server'
import envConfig from '@/lib/config/env.config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Internal server error',
        data: null,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
