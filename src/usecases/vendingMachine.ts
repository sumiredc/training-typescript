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
  private internalEarning: number;

  private internalStocks: Juice[] = [];

  COKE = new Juice('コーラ', 120, 5);

  constructor(balance: number, earn: number) {
    this.internalBalance = balance;
    this.internalEarning = earn;
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

  get earning(): number {
    return this.internalEarning;
  }

  refund(): number {
    const change: number = this.internalBalance;
    this.internalBalance = 0;
    return change;
  }

  get stocks(): any {
    return this.internalStocks;
  }

  buying(juice: string) {
    if (
      this.balance >= this.stocks[juice].price &&
      this.stocks[juice].stock >= 1
    ) {
      this.stocks[juice].stock -= 1;
      this.internalBalance -= this.stocks[juice].price;
      this.internalEarning += this.stocks[juice].price;
    }
  }
}
