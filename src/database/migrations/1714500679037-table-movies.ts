import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableMovies1714500679037 implements MigrationInterface {
  name = 'TableMovies1714500679037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "genre" character varying NOT NULL, "director" character varying NOT NULL, "year" integer NOT NULL, CONSTRAINT "UQ_3a794f850bd3e432c46b3faa913" UNIQUE ("name"), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movies"`);
  }
}
