export default [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'rentx',
    password: 'docker',
    database: 'rentx',
    entities: ['./src/modules/**/entities/*.ts'],
    migrations: ['./src/shared/infra/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/database/migrations/',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'rentx',
    password: 'docker',
    database: 'rentx',
    entities: ['./src/modules/**/entities/*.ts'],
    migrations: ['./src/shared/infra/database/seeds/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/database/seeds/',
    },
  },
];
