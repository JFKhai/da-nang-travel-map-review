import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.json()
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  const accessToken = body.accessToken as string
  if (!accessToken) {
    return Response.json(
      { message: 'Không nhận được access token' },
      {
        status: 400,
      },
    )
  }

  return Response.json(body, {
    status: 200,
  })
}
