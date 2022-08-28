import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEventsTable1660841878747 implements MigrationInterface {
  name = 'AddEventsTable1660841878747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "dateStart" TIMESTAMP NOT NULL DEFAULT now(), "dateEnd" TIMESTAMP NOT NULL DEFAULT now(), "swimmerId" uuid NOT NULL, "coachId" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_10413f96ae9c6d26b9898679d5c" FOREIGN KEY ("swimmerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_19eae5c395108941ac17499c039" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_19eae5c395108941ac17499c039"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_10413f96ae9c6d26b9898679d5c"`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
