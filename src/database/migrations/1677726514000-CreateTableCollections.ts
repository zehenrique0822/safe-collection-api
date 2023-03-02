import { type MigrationInterface, type QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableCollections1677726514000 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "collections",
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment"
        },
        {
          name: "id_points",
          type: "integer",
          isNullable: false
        },
        {
          name: "id_parameters",
          type: "integer",
          isNullable: false
        },
        {
          name: "value",
          type: "decimal",
          precision: 20,
          scale: 5,
          isNullable: false
        },
        {
          name: "date_collect",
          type: "timestamp without time zone",
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
    }))

    await queryRunner.createForeignKey('collections', new TableForeignKey({
      columnNames: ['id_points'],
      referencedColumnNames: ['id'],
      referencedTableName: 'points',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('collections', new TableForeignKey({
      columnNames: ['id_parameters'],
      referencedColumnNames: ['id'],
      referencedTableName: 'parameters',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('collections')
  }
}
