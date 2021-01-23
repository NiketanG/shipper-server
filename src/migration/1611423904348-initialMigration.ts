import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1611423904348 implements MigrationInterface {
	name = "initialMigration1611423904348";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON "session" ("expiredAt") `
		);
		await queryRunner.query(
			`CREATE TABLE "ships" ("email" character varying NOT NULL, "name" text NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "heading" double precision NOT NULL, "speed" double precision NOT NULL, "lastUpdated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_94443b10797d6552ebf30062a20" PRIMARY KEY ("email"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "ships"`);
		await queryRunner.query(`DROP INDEX "IDX_28c5d1d16da7908c97c9bc2f74"`);
		await queryRunner.query(`DROP TABLE "session"`);
	}
}
