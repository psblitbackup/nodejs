import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepotCodeColumn1747585723327 implements MigrationInterface {
    name = 'AddDepotCodeColumn1747585723327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "territories" RENAME COLUMN "depotId" TO "depotCode"`);
        await queryRunner.query(`CREATE TABLE "depots" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_31b63efe71ee2113a5c83b91773" UNIQUE ("code"), CONSTRAINT "PK_d2b12c598f7da47275e8fb7c9fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "territories" DROP COLUMN "depotCode"`);
        await queryRunner.query(`ALTER TABLE "territories" ADD "depotCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "territories" DROP COLUMN "depotCode"`);
        await queryRunner.query(`ALTER TABLE "territories" ADD "depotCode" integer`);
        await queryRunner.query(`DROP TABLE "depots"`);
        await queryRunner.query(`ALTER TABLE "territories" RENAME COLUMN "depotCode" TO "depotId"`);
    }

}
