import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWorkoutTypesToWorkout1641925231765
  implements MigrationInterface
{
  name = 'AddWorkoutTypesToWorkout1641925231765';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workout_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(100) NOT NULL, CONSTRAINT "UQ_f2390c70c5cf72122381fd09bf4" UNIQUE ("type"), CONSTRAINT "PK_03106985514033e6879bdb1a5ac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD "workoutTypesId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD CONSTRAINT "FK_32eb046b89d28e2610ac7bcec0d" FOREIGN KEY ("workoutTypesId") REFERENCES "workout_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout" DROP CONSTRAINT "FK_32eb046b89d28e2610ac7bcec0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" DROP COLUMN "workoutTypesId"`,
    );
    await queryRunner.query(`DROP TABLE "workout_types"`);
  }
}
