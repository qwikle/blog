import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignInValidator from 'App/Validators/SignInValidator'
import SignUpValidator from 'App/Validators/SignUpValidator'
export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async handleLogin({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(SignInValidator)

    try {
      await auth.attempt(email, password)
      return response.redirect('/')
    } catch (error) {
      return response.redirect('/login')
    }
  }

  public async register({ view, auth }: HttpContextContract) {
    if (auth.user) {
      return view.render('welcome')
    }
    return view.render('auth/register')
  }

  public async handleRegister({ auth, request, response }: HttpContextContract) {
    const { email, password, username } = await request.validate(SignUpValidator)
    try {
      const user = await User.create({
        email,
        password,
        username,
      })
      await auth.login(user)
      return response.redirect('/')
    } catch (error) {
      return response.redirect('/register')
    }
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}
