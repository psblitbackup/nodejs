import { MigrationInterface, QueryRunner } from "typeorm";

export class UseSupervisorCode1747629940375 implements MigrationInterface {
    name = 'UseSupervisorCode1747629940375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_cf65986a1aca4c9da695923dc02"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "supervisorId" TO "supervisorCode"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "supervisorCode"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "supervisorCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "supervisorCode"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "supervisorCode" integer`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "supervisorCode" TO "supervisorId"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_cf65986a1aca4c9da695923dc02" FOREIGN KEY ("supervisorId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
