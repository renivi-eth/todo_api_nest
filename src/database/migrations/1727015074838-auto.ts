import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1727015074838 implements MigrationInterface {
  name = 'Auto1727015074838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."task_state_enum" AS ENUM('backlog', 'in-progress', 'done')`);

    await queryRunner.query(
      `CREATE TABLE "task"
       (
           "id"          uuid                       NOT NULL DEFAULT uuid_generate_v4(),
           "name"        character varying(30)      NOT NULL,
           "description" text,
           "state"       "public"."task_state_enum" NOT NULL DEFAULT 'backlog',
           "user_id"     uuid                       NOT NULL,
           "created_at"  TIMESTAMP                  NOT NULL DEFAULT now(),
           "updated_at"  TIMESTAMP                  NOT NULL DEFAULT now(),

           CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
       )`,
    );

    await queryRunner.query(
      `CREATE TABLE "tag"
       (
           "id"         uuid                  NOT NULL DEFAULT uuid_generate_v4(),
           "name"       character varying(50) NOT NULL,
           "user_id"    uuid                  NOT NULL,
           "created_at" TIMESTAMP             NOT NULL DEFAULT now(),
           "updated_at" TIMESTAMP             NOT NULL DEFAULT now(),

           CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
       )`,
    );

    await queryRunner.query(
      `CREATE TABLE "user"
       (
           "id"         uuid                   NOT NULL DEFAULT uuid_generate_v4(),
           "email"      character varying(256) NOT NULL,
           "password"   text                   NOT NULL,
           "created_at" TIMESTAMP              NOT NULL DEFAULT now(),
           "updated_at" TIMESTAMP              NOT NULL DEFAULT now(),

           CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
           CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
       )`,
    );

    await queryRunner.query(
      `ALTER TABLE "task"
          ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "tag"
          ADD CONSTRAINT "FK_d0be05b78e89aff4791e6189f77" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_d0be05b78e89aff4791e6189f77"`);
    await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TYPE "public"."task_state_enum"`);
  }
}
