import type Points from '../../../models/Points'
import { type ICreatePointRequestDTO } from '../useCases/create/ICreatePointDTO'
import { type IListPointsDTO } from '../useCases/list/IListPointsDTO'
import { type IUpdatePointRequestDTO } from '../useCases/update/IUpdatePointDTO'

interface IPointsRepository {
  create: (point: ICreatePointRequestDTO) => Promise<Points>
  find: (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any },
  ) => Promise<Points[] | null>
  findOne: (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any },
  ) => Promise<Points | null>
  list: (pagination: IListPointsDTO) => Promise<{ data: Points[], count: number }>
  update: (point: IUpdatePointRequestDTO) => Promise<Points | null>
  delete: (id: number) => Promise<void>
}

export type {
  IPointsRepository
}
