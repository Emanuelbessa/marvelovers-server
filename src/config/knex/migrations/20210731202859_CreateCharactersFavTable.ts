import * as Knex from 'knex';

const tableName = 'tb_marv_character';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (CharacterTable) => {
    CharacterTable.specificType('cod_user_usr', 'char(36)')
      .notNullable()
      .references('cod_user_usr')
      .inTable('tb_marv_user');
    CharacterTable.integer('cod_marvelid_cha').notNullable();
    CharacterTable.string('des_name_cha').notNullable();
    CharacterTable.string('des_thumbnail_cha', 100).notNullable();
    CharacterTable.string('des_description_cha', 1000).notNullable();
    CharacterTable.dateTime('dat_created_cha').notNullable();
    CharacterTable.primary(['cod_user_usr', 'cod_marvelid_cha']);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tb_marv_character');
}
