import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWorkoutSessionTable1641508470812 implements MigrationInterface {
  name = 'AddWorkoutSessionTable1641508470812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workout_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "swimmerId" uuid NOT NULL, "coachId" uuid NOT NULL, CONSTRAINT "PK_9afb74a335d8e9fd266763779af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" ADD CONSTRAINT "FK_41ac9d616dc74ea8d483ade58b2" FOREIGN KEY ("swimmerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" ADD CONSTRAINT "FK_ac0e279d6d5f9c66aad49790db7" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_session" DROP CONSTRAINT "FK_ac0e279d6d5f9c66aad49790db7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" DROP CONSTRAINT "FK_41ac9d616dc74ea8d483ade58b2"`,
    );
    await queryRunner.query(`DROP TABLE "workout_session"`);
  }
}
