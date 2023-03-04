import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm'
import Points from './Points'
import Parameters from './Parameters'

@Entity('collections')
class Collections {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    id_parameters: number

  @Column()
    id_points: number

  @Column('double precision', { precision: 18, scale: 15 })
    value: number

  @Column()
    date_collect: Date

  @Column()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @ManyToOne(() => Parameters, parameter => parameter.collections)
  @JoinColumn({ name: 'id_parameters' })
    parameter: Parameters

  @ManyToOne(() => Points, point => point.collections)
  @JoinColumn({ name: 'id_points' })
    point: Points
}

export default Collections
