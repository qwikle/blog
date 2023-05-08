import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique().checkRegex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')
      table.string('description', 255).notNullable()
      table.string('body').notNullable()
      table.string('image_url').nullable().checkRegex('/^https?://.*.(?:png|jpg|jpeg|gif|svg)$/')
      table
        .string('status', 255)
        .notNullable()
        .defaultTo('unpublished')
        .checkIn(['published', 'unpublished', 'archived'])
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
