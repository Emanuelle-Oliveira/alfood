import {IPrato} from './IPrato';

export interface IRestaurante {
  id: number,
  nome: string,
  pratos: IPrato[]
}