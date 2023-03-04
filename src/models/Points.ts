import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Collections from './Collections'

@Entity('points')
class Points {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column()
    address: string

  @Column('double precision', { precision: 18, scale: 15 })
    latitude: number

  @Column('double precision', { precision: 18, scale: 15 })
    longitude: number

  @Column()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @OneToMany(() => Collections, collection => collection.point)
    collections: Collections[]
}

export default Points
