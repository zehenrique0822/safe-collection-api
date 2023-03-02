import { Table, type MigrationInterface, type QueryRunner } from "typeorm"

export class CreateTablePoints1677722016489 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "points",
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
          name: "address",
          type: "varchar",
          length: "1000",
          isNullable: false
        },
        {
          name: "latitude",
          type: "float",
          isNullable: false
        },
        {
          name: "longitude",
          type: "float",
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
    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("points")
  }
}
