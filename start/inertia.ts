/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors')
  },
  params: ({ params }) => params,
  user: async ({ auth }) => {
    let user = auth.user
    await user?.load('role')
    return user
  },
  error: ({ session }) => session.flashMessages.get('error'),
  success: ({ session }) => session.flashMessages.get('success'),
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
