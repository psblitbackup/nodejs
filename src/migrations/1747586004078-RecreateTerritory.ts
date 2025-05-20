import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateTerritory1747586004078 implements MigrationInterface {
    name = 'RecreateTerritory1747586004078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "hrCode" character varying, "name" character varying NOT NULL, "mobile" character varying, "email" character varying NOT NULL, "address" character varying, "depotCode" character varying, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "ffType" character varying, "districts" text, "thanas" text, "territoryId" integer NOT NULL, "targetShare" numeric(10,2), "group" character varying, "mhname" character varying, "beginningDate" date, "endDate" date, "approved" boolean NOT NULL DEFAULT false, "role" character varying, "supervisorId" integer, "departmentId" integer, CONSTRAINT "UQ_2f88c4dff473076e55ca2568d51" UNIQUE ("code"), CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departments" ("isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "updatedBy" integer, "id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_91fddbe23e927e1e525c152baa3" UNIQUE ("code"), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "territories" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "level" integer NOT NULL, "entryDate" date NOT NULL DEFAULT ('now'::text)::date, "endDate" date, "isActive" boolean NOT NULL DEFAULT true, "entryBy" integer, "depotCode" character varying, "parent_id" integer, "departmentId" integer, CONSTRAINT "UQ_e1a81c0cf29b429237ed209cc07" UNIQUE ("code"), CONSTRAINT "PK_5fd98f342e49509ee461d86f54f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "depots" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_31b63efe71ee2113a5c83b91773" UNIQUE ("code"), CONSTRAINT "PK_d2b12c598f7da47275e8fb7c9fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_cf65986a1aca4c9da695923dc02" FOREIGN KEY ("supervisorId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "territories" ADD CONSTRAINT "FK_d9d1dc97fe23c6703a8295f7304" FOREIGN KEY ("parent_id") REFERENCES "territories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "territories" ADD CONSTRAINT "FK_71b69f2df88418e54a30dd76cc3" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "territories" DROP CONSTRAINT "FK_71b69f2df88418e54a30dd76cc3"`);
        await queryRunner.query(`ALTER TABLE "territories" DROP CONSTRAINT "FK_d9d1dc97fe23c6703a8295f7304"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_cf65986a1aca4c9da695923dc02"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_4edfe103ebf2fcb98dbb582554b"`);
        await queryRunner.query(`DROP TABLE "depots"`);
        await queryRunner.query(`DROP TABLE "territories"`);
        await queryRunner.query(`DROP TABLE "departments"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
