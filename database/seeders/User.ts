import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        roleId: 3,
      },
      {
        username: 'moderator',
        email: 'moderator@moderator.com',
        password: 'moderator',
        roleId: 2,
      },
    ])
  }
}
