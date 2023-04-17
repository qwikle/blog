import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'

export default class CommentPolicy extends BasePolicy {
  public async create(_user: User) {
    return true
  }
  public async update(user: User, comment: Comment) {
    return user.id === comment.userId
  }
  public async delete(user: User, comment: Comment) {
    await user.load('role')
    return user.role.name === 'admin' || user.id === comment.userId
  }
}
