import {MoneyType} from './money';
import {Juice} from './juice';
import {JuiceType} from './juiceType';

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

  private internalStocks = new Map<JuiceType, Juice>();

  constructor(balance: number, earn: number) {
    this.internalBalance = balance;
    this.internalEarning = earn;
    this.internalStocks.set(JuiceType.COKE, new Juice('コーラ', 120, 5));
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

  get stocks() {
    return this.internalStocks;
  }

  stockInfo() {
    // const stockInfo: string[] = [];
    // for (const [key, value] of this.internalStocks) {
    //   stockInfo.push(value.juiceInfo());
    // }
    // return stockInfo;
    return this.internalStocks.get(JuiceType.COKE)?.price;
  }

  buying(juice: JuiceType) {
    if (
      this.balance >= this.stocks.get(juice).price &&
      this.stocks.get(juice).stocks >= 1
    ) {
    this.internalStocks.get(juice).stock -= 1;
    this.internalBalance -= juice;
    this.internalEarning += juice;
    // }
    // return 0;
  }
}
