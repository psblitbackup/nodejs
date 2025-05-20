import { MigrationInterface, QueryRunner } from "typeorm";

export class UseSupervisorCode1747630075507 implements MigrationInterface {
    name = 'UseSupervisorCode1747630075507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "supervisorCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "supervisorCode"`);
    }

}
