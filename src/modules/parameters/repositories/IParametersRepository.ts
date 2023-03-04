import type Parameters from '../../../models/Parameters'
import { type ICreateParameterRequestDTO } from '../useCases/create/ICreateParameterDTO'
import { type IListParametersDTO } from '../useCases/list/IListParametersDTO'
import { type IUpdateParameterRequestDTO } from '../useCases/update/IUpdateParameterDTO'

interface IParametersRepository {
  create: (parameter: ICreateParameterRequestDTO) => Promise<Parameters>
  find: (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any },
  ) => Promise<Parameters[] | null>
  findOne: (
    where: { [key: string]: any },
    relations?: string[],
    order?: { [key: string]: any },
  ) => Promise<Parameters | null>
  list: (pagination: IListParametersDTO) => Promise<{ data: Parameters[], count: number }>
  update: (parameter: IUpdateParameterRequestDTO) => Promise<Parameters | null>
  delete: (id: number) => Promise<void>
}

export type {
  IParametersRepository
}
