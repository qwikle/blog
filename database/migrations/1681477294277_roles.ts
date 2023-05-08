import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().defaultTo('user').checkIn(['user', 'moderator', 'admin'])
    })

    this.schema.alterTable('users', (table) => {
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .defaultTo(1)
        .notNullable()
    })

    this.defer(async (db) => {
      await db
        .table(this.tableName)
        .insert([{ name: 'user' }, { name: 'moderator' }, { name: 'admin' }])
    })
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('role_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
