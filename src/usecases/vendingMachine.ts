import {MoneyType} from './money';
import {Juice} from './juice';

const validMoney: MoneyType[] = [
  MoneyType.TEN,
  MoneyType.FIFTY,
  MoneyType.HUNDRED,
  MoneyType.FIVE_HUNDRED,
  MoneyType.THOUSAND,
];

export class VendingMachine {
  private internalBalance: number;
  private internalStocks: Juice[] = [];
  COKE = new Juice('コーラ', 120, 5);

  constructor(balance: number) {
    this.internalBalance = balance;
    this.internalStocks.push(this.COKE);
  }

  post(money: MoneyType): number {
    if (validMoney.includes(money)) {
      this.internalBalance += money;
      return 0;
    } else {
      return money;
    }
  }

  get balance(): number {
    return this.internalBalance;
  }

  refund(): number {
    const change: number = this.internalBalance;
    this.internalBalance = 0;
    return change;
  }
  get stocks(): any {
    return this.internalStocks;
  }
}
