import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignInValidator from 'App/Validators/SignInValidator'
import SignUpValidator from 'App/Validators/SignUpValidator'
export default class AuthController {
  public async signIn({ request, auth, inertia }: HttpContextContract) {
    const { email, password } = await request.validate(SignInValidator)

    const user = await auth.attempt(email, password)

    return inertia.render('Dashboard', { user })
  }

  public async signUp({ request, auth, inertia }: HttpContextContract) {
    const { email, password, username } = await request.validate(SignUpValidator)

    const user = await User.create({ email, password, username })

    await auth.login(user)

    return inertia.render('Dashboard', { user })
  }
}
