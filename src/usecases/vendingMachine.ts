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

  // 在庫の追加
  private addStock(juiceType: JuiceType, juice: Juice, quantity: number) {
    this.internalStocks.set(juiceType, {
      juice,
      quantity,
    });
  }

  // お金を入れる
  post(money: MoneyType): number {
    if (validMoney.includes(money)) {
      this.internalBalance += money;
      return 0;
    } else {
      return money;
    }
  }

  // 投入された合計金額
  get balance(): number {
    return this.internalBalance;
  }

  set balance(balance: number) {
    this.internalBalance = balance;
  }

  // 売上
  get earning(): number {
    return this.internalEarning;
  }

  set earning(earning: number) {
    this.internalEarning = earning;
  }

  // 返金する
  refund(): number {
    const change: number = this.internalBalance;
    this.internalBalance = 0;
    return change;
  }

  private get stocks() {
    return this.internalStocks;
  }

  // 在庫状況の取得
  stocksInfo(): string[] {
    const stocksInfo: string[] = [];
    for (const [_, stock] of this.internalStocks) {
      stocksInfo.push(this.makeStockInfoRow(stock.juice, stock.quantity));
    }
    return stocksInfo;
  }

  // 在庫状況の１行を生成
  private makeStockInfoRow(juice: Juice, quantity: number): string {
    return juice.juiceInfo() + ` stock:${quantity}本`;
  }

  // 指定したドリンクが購入できるか判定する
  checkBuyableDrink(juiceType: JuiceType): boolean {
    if (!this.internalStocks.has(juiceType)) {
      return false;
    }
    const { juice, quantity } = this.internalStocks.get(juiceType)!;

    return this.balance >= juice.price && quantity >= 1;
  }

  // 購入可能なジュースの一覧
  acquireBuyableList() {
    const buyableList: string[] = [];
    for (const [juiceType, stock] of this.stocks) {
      if (this.checkBuyableDrink(juiceType)) {
        buyableList.push(this.makeStockInfoRow(stock.juice, stock.quantity));
      }
    }

    return buyableList;
  }

  // 購入
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
