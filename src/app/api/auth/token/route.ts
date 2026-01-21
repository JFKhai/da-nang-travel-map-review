import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const body = await request.json()
  const accessToken = body.accessToken as string
  if (!accessToken) {
    return Response.json(
      { message: 'Không nhận được access token' },
      {
        status: 400,
      },
    )
  }
  const decodedAccessToken = jwt.decode(accessToken) as { exp: number }
  const expiresAt = new Date(decodedAccessToken.exp * 1000).toUTCString()
  return Response.json(body, {
    status: 200,
    headers: {
      'Set-Cookie': `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${expiresAt}`,
    },
  })
}
