import { MoneyType } from '../domein/objects/moneyType';
import { Juice } from '../domein/entities/juice';
import { JuiceType } from '../domein/objects/juiceType';

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

  set balance(balance: number) {
    this.internalBalance = balance;
  }

  get earning(): number {
    return this.internalEarning;
  }

  set earning(earning: number) {
    this.internalEarning = earning;
  }

  refund(): number {
    const change: number = this.internalBalance;
    this.internalBalance = 0;
    return change;
  }

  get stocks() {
    return this.internalStocks;
  }

  stocksInfo() {
    const stocksInfo: string[] = [];
    for (const [key, value] of this.internalStocks) {
      stocksInfo.push(value.juiceInfo());
    }
    return stocksInfo;
  }

  checkBuyingCondition(juice: JuiceType): boolean {
    const selectedJuice = this.stocks.get(juice);
    if (this.balance >= selectedJuice!.price && selectedJuice!.quantity >= 1) {
      return true;
    } else {
      return false;
    }
  }

  buying(juice: JuiceType): number {
    const selectedJuice = this.stocks.get(juice);

    if (this.checkBuyingCondition(juice)) {
      this.internalStocks.get(juice)!.quantity -= 1;
      this.balance -= selectedJuice!.price;
      this.earning += selectedJuice!.price;
    }
    return 0;
  }
}
