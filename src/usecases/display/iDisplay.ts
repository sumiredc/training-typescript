import { Juice } from '../../domain/entities/juice';
import { JuiceType } from '../../domain/objects/juiceType';

export interface IDisplay {
  makeStockInfoRow(juice: Juice, quantity: number): string;

  stocksInfo(
    stocks: Map<JuiceType, { juice: Juice; quantity: number }>
  ): string[];

  acquireBuyableList(
    stocks: Map<JuiceType, { juice: Juice; quantity: number }>
  ): string[];
}
