import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Collections from './Collections'

@Entity('parameters')
class Parameters {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column()
    unit: string

  @Column('double precision', { precision: 18, scale: 15 })
    limit: number

  @Column()
    created_at: Date

  @Column()
    updated_at: Date

  @OneToMany(() => Collections, collection => collection.parameter)
    collections: Collections[]
}

export default Parameters
