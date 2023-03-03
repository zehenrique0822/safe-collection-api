import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Collections from './Collections'

@Entity('points')
class Points {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column()
    address: string

  @Column()
    latitude: number

  @Column()
    longitude: number

  @Column()
    created_at: Date

  @Column()
    updated_at: Date

  @OneToMany(() => Collections, collection => collection.point)
    collections: Collections[]
}

export default Points
