import { Juice, JuiceInfo } from '../../domain/entities/juice';
import { JuiceData, JuiceType } from '../../domain/objects/juiceType';
import { MoneyType } from '../../domain/objects/moneyType';
import { IVendingMachine } from './iVendingMachine';
import { Cash } from '../cash/cash';
import { Stock, StockRow } from '../stock/stock';

const validMoney: MoneyType[] = [
  MoneyType.TEN,
  MoneyType.FIFTY,
  MoneyType.HUNDRED,
  MoneyType.FIVE_HUNDRED,
  MoneyType.THOUSAND,
];

export class VendingMachine implements IVendingMachine {
  constructor(
    private readonly internalCash: Cash = new Cash(),
    private readonly internalStock: Stock = new Stock()
  ) {
    this.initStock();
  }

  get cash(): Cash {
    return this.internalCash;
  }

  get stock(): Stock {
    return this.internalStock;
  }
  private initStock() {
    this.stock.add(new Juice(JuiceType.COKE, 120), 5);
    this.stock.add(new Juice(JuiceType.REDBULL, 200), 5);
    this.stock.add(new Juice(JuiceType.WATER, 100), 5);
  }

  post(money: MoneyType): number {
    if (validMoney.includes(money)) {
      this.cash.addBalance(money);
      return 0;
    }
    return money;
  }

  refund(): number {
    const change: number = this.cash.balance;
    this.cash.resetBalance();
    return change;
  }

  buying(juiceType: JuiceType): boolean {
    if (!this.stock.hasStock(juiceType)) {
      throw new Error('指定されたジュースは存在しません');
    }
    if (!this.isBuyableJuice(juiceType, this.cash.balance)) {
      return false;
    }
    const juice = this.stock.getStockJuice(juiceType)!;
    this.stock.sub(juiceType);
    this.cash.subBalance(juice.price);
    this.cash.addEarning(juice.price);

    return true;
  }

  private isBuyableJuice(juiceType: JuiceType, balance: number): boolean {
    return (
      this.stock.isNotSoldOut(juiceType) &&
      this.stock.isOverEqualPrice(juiceType, balance)
    );
  }

  acquireBuyableList(stocks: Map<JuiceType, StockRow>): JuiceInfo[] {
    const buyableList: JuiceInfo[] = [];
    stocks.forEach(({ juice, quantity }, juiceType) => {
      if (this.isBuyableJuice(juiceType, this.cash.balance)) {
        buyableList.push({ name: juice.name, price: juice.price, quantity });
      }
    });
    return buyableList;
  }
}
