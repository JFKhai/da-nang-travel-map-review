import { NextRequest, NextResponse } from 'next/server'
import envConfig from '@/lib/config/env.config'

export async function PUT(request: NextRequest) {
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

    const body = await request.json()

    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/change-password`, {
      method: 'PUT',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        old_password: body.old_password,
        new_password: body.new_password,
      }),
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
