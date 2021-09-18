import { hashSync } from 'bcrypt';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import app from '@shared/infra/http/app';

describe('ListCategoriesController', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = hashSync('admin', 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, driver_license, admin, created_at, updated_at) VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', '123456789', true, 'now()', 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentx.com.br', password: 'admin' })
      .expect(200);

    await request(app)
      .post('/categories')
      .send({
        name: 'Category test',
        description: 'Description for category test',
      })
      .auth(authResponse.body.token, { type: 'bearer' })
      .expect(201);

    await request(app)
      .post('/categories')
      .send({
        name: 'Category test 2',
        description: 'Description for category test',
      })
      .auth(authResponse.body.token, { type: 'bearer' })
      .expect(201);

    await request(app)
      .get('/categories')
      .expect(200)
      .auth(authResponse.body.token, { type: 'bearer' })
      .then(response => {
        expect.arrayContaining(response.body);
        expect(response.body).toHaveLength(2);
      });
  });
});
