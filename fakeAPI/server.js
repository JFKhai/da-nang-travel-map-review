import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = 3001
const JWT_SECRET = 'your-secret-key-change-in-production'

// Middleware
app.use(cors())
app.use(express.json())

// Fake database - lưu users trong memory
const users = []

// Helper function để tạo response
const createResponse = (success, message, data = null, error = null) => ({
  success,
  message,
  data,
  error,
})

// Helper function để tạo token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

// Helper function để format user (không trả về password)
const formatUser = (user) => {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

// ==================== ROUTES ====================

/**
 * POST /api/auth/register
 * Đăng ký tài khoản mới
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, full_name } = req.body

    // Validation
    if (!email || !password || !full_name) {
      return res
        .status(400)
        .json(createResponse(false, 'Vui lòng điền đầy đủ thông tin', null, 'Missing required fields'))
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return res.status(400).json(createResponse(false, 'Email đã được sử dụng', null, 'Email already exists'))
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      full_name,
      avatar_url: null,
      role: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    users.push(newUser)

    // Return user without password
    const userResponse = formatUser(newUser)

    return res.status(201).json(createResponse(true, 'Đăng ký thành công', userResponse))
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json(createResponse(false, 'Đăng ký thất bại', null, error.message))
  }
})

/**
 * POST /api/auth/login
 * Đăng nhập
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json(createResponse(false, 'Vui lòng nhập email và mật khẩu', null, 'Missing email or password'))
    }

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return res.status(401).json(createResponse(false, 'Email hoặc mật khẩu không đúng', null, 'Invalid credentials'))
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json(createResponse(false, 'Email hoặc mật khẩu không đúng', null, 'Invalid credentials'))
    }

    // Generate token
    const token = generateToken(user.id)

    // Return token and user
    const userResponse = formatUser(user)
    const loginResponse = {
      token,
      user: userResponse,
    }

    return res.status(200).json(createResponse(true, 'Đăng nhập thành công', loginResponse))
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json(createResponse(false, 'Đăng nhập thất bại', null, error.message))
  }
})

/**
 * GET /api/auth/me
 * Lấy thông tin user hiện tại (cần đăng nhập)
 */
app.get('/api/auth/me', (req, res) => {
  console.log('GET /api/auth/me called')
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(createResponse(false, 'Token không hợp lệ', null, 'Invalid token'))
    }

    const token = authHeader.split(' ')[1]
    console.log('Token extracted:', token ? 'Yes' : 'No')

    // Decode JWT token to get user ID
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const userId = decoded.userId

      const user = users.find((u) => u.id === userId)
      if (!user) {
        return res.status(401).json(createResponse(false, 'User không tồn tại', null, 'User not found'))
      }

      // Return user without password
      const userResponse = formatUser(user)

      return res.status(200).json(createResponse(true, 'Lấy thông tin thành công', userResponse))
    } catch (jwtError) {
      // Token invalid or expired
      return res
        .status(401)
        .json(createResponse(false, 'Token không hợp lệ hoặc đã hết hạn', null, 'Invalid or expired token'))
    }
  } catch (error) {
    console.error('Get me error:', error)
    return res.status(500).json(createResponse(false, 'Lấy thông tin thất bại', null, error.message))
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Fake API is running' })
})

// Test endpoint to verify routes are working
app.get('/api/test', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Test endpoint works',
    routes: ['/api/auth/register', '/api/auth/login', '/api/auth/me'],
  })
})

/**
 * GET /api/debugger
 * Debug endpoint - Hiển thị tất cả users và passwords (CHỈ DÙNG CHO DEVELOPMENT)
 */
app.get('/api/debugger', (req, res) => {
  try {
    const usersWithPasswords = users.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password, // Hiển thị password đã hash
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }))

    return res.status(200).json({
      success: true,
      message: 'Danh sách tất cả users',
      total: users.length,
      data: usersWithPasswords,
    })
  } catch (error) {
    console.error('Debugger error:', error)
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách users',
      error: error.message,
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Fake API server is running on http://localhost:${PORT}`)
  console.log(`📝 Register: POST http://localhost:${PORT}/api/auth/register`)
  console.log(`🔐 Login: POST http://localhost:${PORT}/api/auth/login`)
  console.log(`👤 Get Me: GET http://localhost:${PORT}/api/auth/me`)
  console.log(`🐛 Debugger: GET http://localhost:${PORT}/api/debugger`)
})
