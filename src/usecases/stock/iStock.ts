import { Juice } from '../../domain/entities/juice';
import { JuiceType } from '../../domain/objects/juiceType';

export interface IStock {
  get stocks(): Map<JuiceType, { juice: Juice; quantity: number }>;
  addStock(juiceType: JuiceType, juice: Juice, quantity: number): void;
  checkStockCondition(juiceType: JuiceType): boolean;
}
