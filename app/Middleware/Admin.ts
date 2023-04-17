import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    await auth.use('web').authenticate()
    if (auth.user?.role.name !== 'admin') {
      return response.status(401).redirect('/')
    }
    await next()
  }
}
