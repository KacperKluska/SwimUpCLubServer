import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadesOnDelete1642021412560 implements MigrationInterface {
  name = 'AddCascadesOnDelete1642021412560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_51dabb934475afa077f62c116c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" DROP CONSTRAINT "FK_41ac9d616dc74ea8d483ade58b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" DROP CONSTRAINT "FK_ac0e279d6d5f9c66aad49790db7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_c35bf7612c95a322c0744fa9093"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "FK_92489c96add995f76f80ea14211"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "FK_67271c01fe4fe89ab10e843a939"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" DROP CONSTRAINT "FK_d5a417f6452db06e9d8252b8974"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_51dabb934475afa077f62c116c0"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userDetailsId"`);
    await queryRunner.query(
      `ALTER TABLE "user_details" ADD "userId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_details" ADD CONSTRAINT "UQ_5261d2468b1288b347d58e8b540" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" ADD CONSTRAINT "FK_41ac9d616dc74ea8d483ade58b2" FOREIGN KEY ("swimmerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" ADD CONSTRAINT "FK_ac0e279d6d5f9c66aad49790db7" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_c35bf7612c95a322c0744fa9093" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_details" ADD CONSTRAINT "FK_5261d2468b1288b347d58e8b540" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "FK_92489c96add995f76f80ea14211" FOREIGN KEY ("swimmerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "FK_67271c01fe4fe89ab10e843a939" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD CONSTRAINT "FK_d5a417f6452db06e9d8252b8974" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout" DROP CONSTRAINT "FK_d5a417f6452db06e9d8252b8974"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "FK_67271c01fe4fe89ab10e843a939"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "FK_92489c96add995f76f80ea14211"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_details" DROP CONSTRAINT "FK_5261d2468b1288b347d58e8b540"`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" DROP CONSTRAINT "FK_c35bf7612c95a322c0744fa9093"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" DROP CONSTRAINT "FK_ac0e279d6d5f9c66aad49790db7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" DROP CONSTRAINT "FK_41ac9d616dc74ea8d483ade58b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_details" DROP CONSTRAINT "UQ_5261d2468b1288b347d58e8b540"`,
    );
    await queryRunner.query(`ALTER TABLE "user_details" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "userDetailsId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_51dabb934475afa077f62c116c0" UNIQUE ("userDetailsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD CONSTRAINT "FK_d5a417f6452db06e9d8252b8974" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "FK_67271c01fe4fe89ab10e843a939" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "FK_92489c96add995f76f80ea14211" FOREIGN KEY ("swimmerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "note" ADD CONSTRAINT "FK_c35bf7612c95a322c0744fa9093" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" ADD CONSTRAINT "FK_ac0e279d6d5f9c66aad49790db7" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_session" ADD CONSTRAINT "FK_41ac9d616dc74ea8d483ade58b2" FOREIGN KEY ("swimmerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_51dabb934475afa077f62c116c0" FOREIGN KEY ("userDetailsId") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
