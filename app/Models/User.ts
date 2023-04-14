import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Article from 'App/Models/Article'
import Comment from 'App/Models/Comment'
import Role from 'App/Models/Role'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatarUrl: string | null

  @column()
  public username: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // user has many articles
  @hasMany(() => Article)
  public articles: HasMany<typeof Article>

  // user has many comments
  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
