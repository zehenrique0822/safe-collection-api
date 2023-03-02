import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Points from './Points'
import Parameters from './Parameters'

@Entity('collections')
class Collections {
  @PrimaryGeneratedColumn()
    id: number

  @Column('timestamp without time zone')
    date_collect: Date

  @Column('decimal', { precision: 20, scale: 5 })
    value: number

  @ManyToOne(() => Points, point => point.collections)
  @JoinColumn({ name: 'id_points' })
    point: Points

  @ManyToOne(() => Parameters, parameter => parameter.collections)
  @JoinColumn({ name: 'id_parameters' })
    parameter: Parameters

  @Column('timestamp without time zone', { default: () => 'now()' })
    created_at: Date

  @Column('timestamp without time zone', { default: () => 'now()', onUpdate: 'now()' })
    updated_at: Date
}

export default Collections
