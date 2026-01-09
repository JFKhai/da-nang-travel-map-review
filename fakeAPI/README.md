# Fake API Server

Server giả lập API authentication chạy trên cổng 3001.

## Cài đặt

```bash
cd fakeAPI
npm install
```

## Chạy server

```bash
npm run dev
```

Hoặc từ thư mục gốc:

```bash
npm run fake-api
```

Server sẽ chạy tại: `http://localhost:3001`

## API Endpoints

### POST /api/auth/register

Đăng ký tài khoản mới

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "Nguyễn Văn A"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "Nguyễn Văn A",
    "avatar_url": null,
    "role": "user",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

### POST /api/auth/login

Đăng nhập

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "full_name": "Nguyễn Văn A",
      "avatar_url": null,
      "role": "user",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  },
  "error": null
}
```

## Cấu hình

Để sử dụng fake API trong dự án Next.js, thêm vào file `.env.local`:

```
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3001/api
```
