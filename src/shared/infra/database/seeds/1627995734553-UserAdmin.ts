import { hashSync } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';

export class UserAdmin1627995734553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = uuid();
    const password = hashSync('admin', 8);

    await queryRunner.query(
      `INSERT INTO users (id, name, email, password, driver_license, admin, created_at, updated_at) VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', '123456789', true, 'now()', 'now()')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DELETE FROM users WHERE email = admin@rentx.com.br',
    );
  }
}
