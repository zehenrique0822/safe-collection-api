import type Collections from '../../../models/Collections'
import { type ICreateCollectionRequestDTO } from '../useCases/create/ICreateCollectionDTO'
import { type IListCollectionsRequestDTO } from '../useCases/list/IListCollectionsDTO'
import { type IUpdateCollectionRequestDTO } from '../useCases/update/IUpdateCollectionsDTO'

interface ICollectionsRepository {
  create: (parameter: ICreateCollectionRequestDTO) => Promise<Collections>
  find: (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any },
  ) => Promise<Collections[] | null>
  findOne: (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any },
  ) => Promise<Collections | null>
  list: (pagination: IListCollectionsRequestDTO) => Promise<{ data: Collections[], count: number }>
  update: (parameter: IUpdateCollectionRequestDTO) => Promise<Collections | null>
  delete: (id: number) => Promise<void>
}

export type {
  ICollectionsRepository
}
