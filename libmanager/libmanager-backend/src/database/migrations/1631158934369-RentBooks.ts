import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RentBooks1631158934369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'rent_books',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                },
                {
                  name: 'user_id',
                  type: 'varchar',
                },
                {
                    name: 'book_id',
                    type: 'varchar',
                },
                {
                  name: 'rent_initial',
                  type: 'timestamp',
                },
                {
                    name: 'rent_final',
                    type: 'timestamp',
                },

                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rent_books');
    }

}
