import { NextRequest, NextResponse } from 'next/server'

// Define the type for route properties in Next.js 15+
type RouteProps = {
  params: Promise<{ path: string[] }>
}

export async function GET(request: NextRequest, props: RouteProps) {
  const params = await props.params
  return forwardRequest(request, params)
}

export async function POST(request: NextRequest, props: RouteProps) {
  const params = await props.params
  return forwardRequest(request, params)
}

export async function PUT(request: NextRequest, props: RouteProps) {
  const params = await props.params
  return forwardRequest(request, params)
}

export async function DELETE(request: NextRequest, props: RouteProps) {
  const params = await props.params
  return forwardRequest(request, params)
}

async function forwardRequest(request: NextRequest, params: { path: string[] }) {
  try {
    // Check if params or params.path is undefined
    if (!params || !params.path) {
      console.error('Invalid params:', params)
      return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 })
    }

    const path = params.path.join('/')
    const query = request.nextUrl.search
    const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8080/api'
    const targetUrl = `${apiUrl}/${path}${query}`

    console.log(`Forwarding ${request.method} request to: ${targetUrl}`)

    const headers = new Headers(request.headers)
    headers.delete('host')

    const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.blob()

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      // @ts-ignore
      duplex: 'half',
    })

    const data = await response.blob()

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
  } catch (error) {
    console.error('Proxy Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
