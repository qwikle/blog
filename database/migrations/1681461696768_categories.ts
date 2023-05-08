import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable().unique()
      table.string('slug', 255).notNullable().unique().checkRegex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')
      table.string('description', 255).notNullable()
      table.string('image_url').nullable().checkRegex('/^https?://.*.(?:png|jpg|jpeg|gif|svg)$/')

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
