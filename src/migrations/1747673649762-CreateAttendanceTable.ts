import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAttendanceTable1747673649762 implements MigrationInterface {
    name = 'CreateAttendanceTable1747673649762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attendances_type_enum" AS ENUM('checkin', 'checkout')`);
        await queryRunner.query(`CREATE TABLE "attendances" ("id" SERIAL NOT NULL, "employeeId" integer NOT NULL, "date" date NOT NULL, "workingArea" character varying NOT NULL, "market" character varying NOT NULL, "type" "public"."attendances_type_enum" NOT NULL, "latitude" numeric(10,6), "longitude" numeric(10,6), "remarks" text, "selfieUrl" character varying, "workingWith" character varying, "approved" boolean NOT NULL DEFAULT false, "approvedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_4a9f77d05b9c764ff1053401cdd" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_4a9f77d05b9c764ff1053401cdd"`);
        await queryRunner.query(`DROP TABLE "attendances"`);
        await queryRunner.query(`DROP TYPE "public"."attendances_type_enum"`);
    }

}
