import { Juice } from '../../domain/entities/juice';
import { JuiceType } from '../../domain/objects/juiceType';
import { MoneyType } from '../../domain/objects/moneyType';

export interface IVendingMachine {
  post(money: MoneyType): number;
  refund(): number;
  buying(juiceType: JuiceType): number;
  isBuyableJuice(juiceType: JuiceType): boolean;
  overEqualBalance(price: number): boolean;
  acquireBuyableList(
    stocks: Map<JuiceType, { juice: Juice; quantity: number }>
  ): Map<JuiceType, { juice: Juice; quantity: number }>;
}
