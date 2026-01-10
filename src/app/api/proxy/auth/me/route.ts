import { NextRequest, NextResponse } from 'next/server'
import envConfig from '@/lib/config/env.config'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authorization header is required',
          data: null,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
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
