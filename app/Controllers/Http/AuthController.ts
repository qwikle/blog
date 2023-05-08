import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignInValidator from 'App/Validators/SignInValidator'
import SignUpValidator from 'App/Validators/SignUpValidator'
export default class AuthController {
  public async getSignIn({ inertia }: HttpContextContract) {
    return inertia.render('auth/SignIn')
  }

  public async signIn({ request, auth, inertia, session }: HttpContextContract) {
    const { email, password, rememberMe } = await request.validate(SignInValidator)

    try {
      await auth.attempt(email, password, rememberMe)
      return inertia.render('home')
    } catch {
      session.flash('error', 'Email ou mot de passe incorrect')
      return inertia.redirectBack()
    }
  }

  public async getSignUp({ inertia }: HttpContextContract) {
    return inertia.render('auth/SignUp')
  }

  public async signUp({ request, auth, inertia }: HttpContextContract) {
    const { email, password, username } = await request.validate(SignUpValidator)
    const user = await User.create({ email, password, username })

    await auth.login(user)
    return inertia.render('home', { user })
  }

  public async signOut({ auth, inertia }: HttpContextContract) {
    await auth.logout()

    return inertia.render('home')
  }
}
