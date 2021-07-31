import * as Knex from 'knex';

const tableName = 'tb_marv_user';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (UserTable) => {
    UserTable.specificType('cod_user_usr', 'char(36)')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('UUID()'));
    UserTable.string('des_name_usr').notNullable();
    UserTable.string('des_email_usr', 50).notNullable().unique();
    UserTable.string('des_password_usr', 60).notNullable();
    UserTable.dateTime('dat_created_usr').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tb_marv_user');
}
