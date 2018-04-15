module.exports = {
  development: {
    client: 'sqlite3',
    debug: true,
    useNullAsDefault: true,
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      tableName: 'knexMigrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
