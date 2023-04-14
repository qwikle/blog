import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Article from 'App/Models/Article'
export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
    disableUpdates: false,
  })
  public slug: string

  @column()
  public description: string

  @column()
  public imageUrl: string

  @hasMany(() => Article)
  public articles: HasMany<typeof Article>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
