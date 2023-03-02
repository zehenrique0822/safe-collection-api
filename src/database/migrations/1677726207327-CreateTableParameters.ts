import { Table, type MigrationInterface, type QueryRunner } from "typeorm"

export class CreateTableParameters1677726207327 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "parameters",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "unit",
            type: "varchar",
            length: "255",
            isNullable: false
          },
          {
            name: "limit",
            type: "decimal",
            precision: 20,
            scale: 5,
            isNullable: false
          },
          {
            name: "created_at",
            type: "timestamp without time zone",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp without time zone",
            default: "now()",
            onUpdate: "now()"
          }
        ]
      }),
      true
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("parameters")
  }
}
