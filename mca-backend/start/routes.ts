/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Public routes
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Authentication routes
router.post('/auth/login', async ({ request, auth, response }) => {
  const { email, password } = request.only(['email', 'password'])

  try {
    const User = await import('#models/user')
    const user = await User.default.verifyCredentials(email, password)
    await auth.use('web').login(user)
    return response.json({
      success: true,
      user,
      message: 'Login successful',
    })
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: 'Invalid credentials',
    })
  }
})

router.post('/auth/register', async ({ request, auth, response }) => {
  const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

  try {
    const User = await import('#models/user')
    const user = await User.default.create({
      email,
      password,
      fullName,
    })

    await auth.use('web').login(user)

    return response.json({
      success: true,
      user: auth.user,
      message: 'Registration successful',
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    })
  }
})

router.post('/auth/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  return response.json({
    success: true,
    message: 'Logout successful',
  })
})

router.get('/auth/user', async ({ auth, response }) => {
  try {
    await auth.use('web').authenticate()
    return response.json({
      success: true,
      user: auth.user,
    })
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: 'Not authenticated',
    })
  }
})

// Protected route example
router.get('/protected', async ({ auth, response }) => {
  try {
    await auth.use('web').authenticate()
    return response.json({
      message: 'This is a protected route',
      user: auth.user,
    })
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: 'Not authenticated',
    })
  }
})
