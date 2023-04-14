import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Article from 'App/Models/Article'
import User from 'App/Models/User'
export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public body: string

  @column({ columnName: 'user_id', serializeAs: null })
  public userId: number

  @column({ columnName: 'article_id', serializeAs: null })
  public articleId: number

  @belongsTo(() => Article)
  public article: BelongsTo<typeof Article>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
