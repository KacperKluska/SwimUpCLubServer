import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderTableToUserDetails1641506400059
  implements MigrationInterface
{
  name = 'AddGenderTableToUserDetails1641506400059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gender" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" character varying(50) NOT NULL, CONSTRAINT "UQ_74edcd95179a14f6f24d6cac6d9" UNIQUE ("gender"), CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_details" ADD "genderId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_details" ADD CONSTRAINT "FK_77030a77f82cc3ff5182f1b8ebe" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_details" DROP CONSTRAINT "FK_77030a77f82cc3ff5182f1b8ebe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_details" DROP COLUMN "genderId"`,
    );
    await queryRunner.query(`DROP TABLE "gender"`);
  }
}
