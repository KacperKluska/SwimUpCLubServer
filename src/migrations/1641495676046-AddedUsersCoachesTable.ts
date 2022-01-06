import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedUsersCoachesTable1641495676046 implements MigrationInterface {
  name = 'AddedUsersCoachesTable1641495676046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_coaches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "swimmerId" uuid, "coachId" uuid, CONSTRAINT "REL_92489c96add995f76f80ea1421" UNIQUE ("swimmerId"), CONSTRAINT "REL_67271c01fe4fe89ab10e843a93" UNIQUE ("coachId"), CONSTRAINT "PK_6963ac5532b1e040d59230c0f89" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "FK_92489c96add995f76f80ea14211" FOREIGN KEY ("swimmerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "FK_67271c01fe4fe89ab10e843a939" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "FK_67271c01fe4fe89ab10e843a939"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "FK_92489c96add995f76f80ea14211"`,
    );
    await queryRunner.query(`DROP TABLE "users_coaches"`);
  }
}
