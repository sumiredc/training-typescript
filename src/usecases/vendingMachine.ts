import { MoneyType } from '../domain/objects/moneyType';
import { Juice } from '../domain/entities/juice';
import { JuiceType } from '../domain/objects/juiceType';

const validMoney: MoneyType[] = [
  MoneyType.TEN,
  MoneyType.FIFTY,
  MoneyType.HUNDRED,
  MoneyType.FIVE_HUNDRED,
  MoneyType.THOUSAND,
];

export class VendingMachine {
  private internalStocks = new Map<
    JuiceType,
    { juice: Juice; quantity: number }
  >();

  constructor(
    private internalBalance: number = 0,
    private internalEarning: number = 0
  ) {
    this.addStock(JuiceType.COKE, new Juice('コーラ', 120), 5);
    this.addStock(JuiceType.REDBULL, new Juice('レッドブル', 200), 5);
    this.addStock(JuiceType.WATER, new Juice('水', 100), 5);
  }

  addStock(juiceType: JuiceType, juice: Juice, quantity: number) {
    this.internalStocks.set(juiceType, { juice, quantity });
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
    const change: number = this.balance;
    this.internalBalance = 0;
    return change;
  }

  get stocks() {
    return this.internalStocks;
  }

  stocksInfo() {
    const stocksInfo: string[] = [];
    for (const [_, stock] of this.internalStocks) {
      stocksInfo.push(this.makeStockInfoRow(stock.juice, stock.quantity));
    }
    return stocksInfo;
  }

  private makeStockInfoRow(juice: Juice, quantity: number) {
    return juice.juiceInfo() + ` stock:${quantity}本`;
  }

  checkBuyableDrink(juiceType: JuiceType): boolean {
    if (!this.stocks.has(juiceType)) {
      return false;
    } else {
      const { juice, quantity } = this.stocks.get(juiceType)!;
      return this.balance >= juice.price && quantity >= 1;
    }
  }

  acquireBuyableList() {
    const buyableList: string[] = [];
    for (const [juiceType, stock] of this.stocks) {
      if (this.checkBuyableDrink(juiceType)) {
        buyableList.push(this.makeStockInfoRow(stock.juice, stock.quantity));
      }
    }

    return buyableList;
  }

  buying(juiceType: JuiceType): number {
    const { juice, quantity } = this.stocks.get(juiceType)!;

    if (this.checkBuyableDrink(juiceType)) {
      this.stocks.set(juiceType, { juice, quantity: quantity - 1 });
      this.balance -= juice.price;
      this.earning += juice.price;
    }
    return this.refund();
  }
}
