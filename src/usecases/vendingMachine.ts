import {MoneyType} from './money';

const validMoney: MoneyType[] = [
  MoneyType.TEN,
  MoneyType.FIFTY,
  MoneyType.HUNDRED,
  MoneyType.FIVE_HUNDRED,
  MoneyType.THOUSAND,
];

export class VendingMachine {
  private internalBalance: number = 0;

  post(money: MoneyType) {
    if (validMoney.includes(money)) {
      this.internalBalance += money;
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
}
