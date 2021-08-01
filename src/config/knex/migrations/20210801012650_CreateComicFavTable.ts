import * as Knex from 'knex';

const tableName = 'tb_marv_comic';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (ComicTable) => {
    ComicTable.specificType('cod_user_usr', 'char(36)')
      .notNullable()
      .defaultTo(knex.raw('UUID()'));
    ComicTable.integer('cod_marvelid_com').notNullable();
    ComicTable.string('des_name_com').notNullable();
    ComicTable.string('des_thumbnail_com', 100).notNullable();
    ComicTable.string('des_description_com', 60).notNullable();
    ComicTable.dateTime('dat_created_com').notNullable();
    ComicTable.primary(['cod_user_usr', 'cod_marvelid_com']);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tb_marv_comic');
}
