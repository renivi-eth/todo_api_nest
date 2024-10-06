import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskTagColumn1728219612226 implements MigrationInterface {
    name = 'AddTaskTagColumn1728219612226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_tag" ("task_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_9bd1d11e72e0471503a8c07b5dd" PRIMARY KEY ("task_id", "tag_id"))`);
        await queryRunner.query(`ALTER TABLE "task_tag" ADD CONSTRAINT "FK_8a266d51df4605134aa122fbda1" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_tag" ADD CONSTRAINT "FK_343faa365ee706cad6e13a3828f" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_tag" DROP CONSTRAINT "FK_343faa365ee706cad6e13a3828f"`);
        await queryRunner.query(`ALTER TABLE "task_tag" DROP CONSTRAINT "FK_8a266d51df4605134aa122fbda1"`);
        await queryRunner.query(`DROP TABLE "task_tag"`);
    }

}
