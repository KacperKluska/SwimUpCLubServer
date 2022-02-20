import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotesTable1641924092691 implements MigrationInterface {
  name = 'AddNotesTable1641924092691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "note" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" character varying(500) NOT NULL, "workoutSessionId" uuid NOT NULL, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_c35bf7612c95a322c0744fa9093" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_c35bf7612c95a322c0744fa9093"`,
    );
    await queryRunner.query(`DROP TABLE "note"`);
  }
}
