// knexfile.js
/**
 * @type {import('knex').Knex.Config}
 */
const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "123",
      port: 3306,
      database: "skilltest_shieldtag",
    },
    migrations: {
      directory: "./migrations",
      tableName: "migrations",
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

export default config;
