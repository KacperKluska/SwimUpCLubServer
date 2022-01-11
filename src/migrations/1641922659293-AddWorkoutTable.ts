import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWorkoutTable1641922659293 implements MigrationInterface {
  name = 'AddWorkoutTable1641922659293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workout" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIME NOT NULL, "distance" double precision NOT NULL, "averageSpeed" double precision NOT NULL, "averagePace" double precision NOT NULL, "workoutSessionId" uuid NOT NULL, CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD CONSTRAINT "FK_d5a417f6452db06e9d8252b8974" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout" DROP CONSTRAINT "FK_d5a417f6452db06e9d8252b8974"`,
    );
    await queryRunner.query(`DROP TABLE "workout"`);
  }
}
