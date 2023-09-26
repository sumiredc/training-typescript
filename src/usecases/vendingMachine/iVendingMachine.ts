import { JuiceType } from '@/enterprise/objects/juiceType';
import { MoneyType } from '@/enterprise/objects/moneyType';

export interface IVendingMachine {
  post(money: MoneyType): number;
  refund(): number;
  buying(juiceType: JuiceType): number;
}
