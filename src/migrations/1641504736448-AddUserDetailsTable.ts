import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserDetailsTable1641504736448 implements MigrationInterface {
  name = 'AddUserDetailsTable1641504736448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phoneNumber" character varying(15) NOT NULL, "photo" character varying(255), "age" integer, "weight" double precision, "height" double precision, CONSTRAINT "UQ_dbf7c9acb9c0dc9388671dbbede" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_e0191ee79b00985a99d1de6f1f0" UNIQUE ("photo"), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "userDetailsId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_51dabb934475afa077f62c116c0" UNIQUE ("userDetailsId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_51dabb934475afa077f62c116c0" FOREIGN KEY ("userDetailsId") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_51dabb934475afa077f62c116c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_51dabb934475afa077f62c116c0"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userDetailsId"`);
    await queryRunner.query(`DROP TABLE "user_details"`);
  }
}
