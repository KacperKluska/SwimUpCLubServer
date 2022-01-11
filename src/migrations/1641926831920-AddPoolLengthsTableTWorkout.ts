import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPoolLengthsTableTWorkout1641926831920
  implements MigrationInterface
{
  name = 'AddPoolLengthsTableTWorkout1641926831920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pool_length" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "length" integer NOT NULL, CONSTRAINT "UQ_2d3229c68fb43a47de67cb88381" UNIQUE ("length"), CONSTRAINT "PK_9cecc244919ae7289af1209b36e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD "poolLengthId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD CONSTRAINT "FK_e30a002601c66e2d3836e6f06d8" FOREIGN KEY ("poolLengthId") REFERENCES "pool_length"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout" DROP CONSTRAINT "FK_e30a002601c66e2d3836e6f06d8"`,
    );
    await queryRunner.query(`ALTER TABLE "workout" DROP COLUMN "poolLengthId"`);
    await queryRunner.query(`DROP TABLE "pool_length"`);
  }
}
