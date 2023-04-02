// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config({ path: '../.env' });
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.PGADMIN_DB_NAME, // name of the pgadmin database you want to connect to
      user: process.env.PGADMIN_DB_USER,
      password: process.env.PGADMIN_DB_PW,
    },
    // how many connections can be going into the database at a given time
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};

console.log(process.env.PGADMIN_DB_NAME)