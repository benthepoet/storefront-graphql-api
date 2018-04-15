
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('Permission', table => {
      table
        .integer('id')
        .notNullable()
        .primary();
        
      table.string('name');
    }),
    
    knex.schema.createTable('Role', table => {
      table
        .integer('id')
        .notNullable()
        .primary();
        
      table
        .integer('parentId')
        .references('Role.id');
  
      table
        .string('name')
        .notNullable();
    }),
    
    knex.schema.createTable('RolePermission', table => {
      table
        .integer('id')
        .notNullable()
        .primary();
        
      table
        .integer('permissionId')
        .references('Permission.id');
        
      table
        .integer('roleId')
        .references('Role.id');
        
      table
        .boolean('isRevoked')
        .notNullable()
        .defaultTo(0);
        
      table.unique(['permissionId', 'roleId']);
    }),
    
    knex.schema.createTable('user', table => {
      table
        .integer('id')
        .notNullable()
        .primary();
      
      table
        .string('email')
        .notNullable()
        .unique();
      
      table
        .string('hash')
        .notNullable();
      
      table
        .dateTime('dateAdded')
        .defaultTo(knex.fn.now());
    }),
  
    knex.schema.createTable('UserProfile', table => {
      table
        .integer('id')
        .notNullable()
        .primary()
        .references('User.id');
      
      table
        .integer('roleId')
        .notNullable()
        .references('Role.id');
      
      table.string('firstName');
      table.string('lastName');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('Permission'),
    knex.schema.dropTable('Role'),
    knex.schema.dropTable('RolePermission'),
    knex.schema.dropTable('UserProfile'),
    knex.schema.dropTable('User')
  ]);
};
