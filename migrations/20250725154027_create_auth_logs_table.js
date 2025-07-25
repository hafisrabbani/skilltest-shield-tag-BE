export async function up(knex) {
    await knex.schema.createTable('auth_logs', (table) => {
        table.increments('id').primary();
        table.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.string('action').notNullable();
        table.string('ip_address').notNullable();
        table.timestamp('timestamp').defaultTo(knex.fn.now());
        table.string('user_agent');
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists('auth_logs');
}
