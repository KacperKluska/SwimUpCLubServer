import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRoleTableToUser1641493690474 implements MigrationInterface {
  name = 'AddUserRoleTableToUser1641493690474';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying(50) NOT NULL UNIQUE, CONSTRAINT "UQ_30ddd91a212a9d03669bc1dee74" UNIQUE ("role"), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "userRoleId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_72292a143eb57e1189603308430" UNIQUE ("userRoleId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_72292a143eb57e1189603308430" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_72292a143eb57e1189603308430"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_72292a143eb57e1189603308430"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userRoleId"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
  }
}
