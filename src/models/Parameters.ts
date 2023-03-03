import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Collections from './Collections'

@Entity('parameters')
class Parameters {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column({ type: 'decimal', precision: 20, scale: 5 })
    valor: number

  @Column()
    date_collect: Date

  @Column()
    created_at: Date

  @Column()
    updated_at: Date

  @OneToMany(() => Collections, collection => collection.parameter)
    collections: Collections[]
}

export default Parameters
