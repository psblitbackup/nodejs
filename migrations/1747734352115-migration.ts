import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1747734352115 implements MigrationInterface {
    name = 'Migration1747734352115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."leaves_type_enum" AS ENUM('casual', 'earned', 'sick', 'weekend')`);
        await queryRunner.query(`CREATE TABLE "leaves" ("id" SERIAL NOT NULL, "employeeId" integer NOT NULL, "type" "public"."leaves_type_enum" NOT NULL, "fromDate" date NOT NULL, "toDate" date NOT NULL, "reason" text, "approved" boolean NOT NULL DEFAULT false, "approvedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4153ec7270da3d07efd2e11e2a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "leaves" ADD CONSTRAINT "FK_d4278e2dd5d9673eac18b6ab6f8" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leaves" DROP CONSTRAINT "FK_d4278e2dd5d9673eac18b6ab6f8"`);
        await queryRunner.query(`DROP TABLE "leaves"`);
        await queryRunner.query(`DROP TYPE "public"."leaves_type_enum"`);
    }

}
