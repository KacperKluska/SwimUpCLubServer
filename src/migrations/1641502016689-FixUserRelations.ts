import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserRelations1641502016689 implements MigrationInterface {
  name = 'FixUserRelations1641502016689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_72292a143eb57e1189603308430"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "userRoleId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_72292a143eb57e1189603308430"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "FK_92489c96add995f76f80ea14211"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "FK_67271c01fe4fe89ab10e843a939"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ALTER COLUMN "swimmerId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "REL_92489c96add995f76f80ea1421"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ALTER COLUMN "coachId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" DROP CONSTRAINT "REL_67271c01fe4fe89ab10e843a93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_72292a143eb57e1189603308430" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_72292a143eb57e1189603308430"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "REL_67271c01fe4fe89ab10e843a93" UNIQUE ("coachId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ALTER COLUMN "coachId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "REL_92489c96add995f76f80ea1421" UNIQUE ("swimmerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ALTER COLUMN "swimmerId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "FK_67271c01fe4fe89ab10e843a939" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_coaches" ADD CONSTRAINT "FK_92489c96add995f76f80ea14211" FOREIGN KEY ("swimmerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_72292a143eb57e1189603308430" UNIQUE ("userRoleId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "userRoleId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_72292a143eb57e1189603308430" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
