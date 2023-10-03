import { Juice, JuiceInfo } from '../../domain/entities/juice';
import { JuiceType } from '../../domain/objects/juiceType';
import { MoneyType } from '../../domain/objects/moneyType';

export interface IVendingMachine {
  post(money: MoneyType): number;
  refund(): number;
  buying(juiceType: JuiceType): boolean;

  acquireBuyableList(
    stocks: Map<JuiceType, { juice: Juice; quantity: number }>
  ): JuiceInfo[];
}
