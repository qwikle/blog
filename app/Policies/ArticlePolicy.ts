import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Article from 'App/Models/Article'
import User from 'App/Models/User'

export default class ArticlePolicy extends BasePolicy {
  public async view(user: User, article: Article) {
    await user.load('role')
    if (user.role.name === 'admin' || user.id === article.userId) {
      return true
    }
    return article.status === 'published'
  }

  public async create(user: User) {
    await user.load('role')
    return user.role.name === 'admin'
  }
  public async update(user: User, article: Article) {
    await user.load('role')
    return user.role.name === 'admin' || user.id === article.userId
  }
  public async delete(article: Article, user: User) {
    await user.load('role')
    return user.role.name === 'admin' || user.id === article.userId
  }
}
