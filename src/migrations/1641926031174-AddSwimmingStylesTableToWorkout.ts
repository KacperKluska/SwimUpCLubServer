import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSwimmingStylesTableToWorkout1641926031174
  implements MigrationInterface
{
  name = 'AddSwimmingStylesTableToWorkout1641926031174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "swimming_style" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "length" integer NOT NULL, CONSTRAINT "UQ_7ff36c914138aab4fb5c0ad0ac9" UNIQUE ("length"), CONSTRAINT "PK_c072564593955f1748c48790d5a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD "swimmingStyleId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD CONSTRAINT "FK_fb50bf243896698341b54c0a20e" FOREIGN KEY ("swimmingStyleId") REFERENCES "swimming_style"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout" DROP CONSTRAINT "FK_fb50bf243896698341b54c0a20e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" DROP COLUMN "swimmingStyleId"`,
    );
    await queryRunner.query(`DROP TABLE "swimming_style"`);
  }
}
