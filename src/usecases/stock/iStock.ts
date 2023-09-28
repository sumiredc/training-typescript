import { Juice } from '../../domain/entities/juice';
import { JuiceType } from '../../domain/objects/juiceType';

export interface IStock {
  get stocks(): Map<JuiceType, { juice: Juice; quantity: number }>;
  add(juice: Juice, quantity: number): void;
}
