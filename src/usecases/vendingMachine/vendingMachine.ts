import { Juice } from '../../domain/entities/juice';
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
      this.cash.balance += money;
      return 0;
    } else {
      return money;
    }
  }

  refund(): number {
    const change: number = this.cash.balance;
    this.cash.balance = 0;
    return change;
  }

  buying(juiceType: JuiceType): number {
    const { juice, quantity } = this.stock.stocks.get(juiceType)!;

    if (this.isBuyableJuice(juiceType) && this.overEqualBalance(juice.price)) {
      this.stock.stocks.set(juiceType, { juice, quantity: quantity - 1 });
      this.cash.balance -= juice.price;
      this.cash.earning += juice.price;
    }
    return this.refund();
  }

  isBuyableJuice(juiceType: JuiceType): boolean {
    const quantity = this.stock.getStockQuantity(juiceType);
    return quantity > 0;
  }

  overEqualBalance(price: number): boolean {
    return this.cash.balance >= price;
  }

  acquireBuyableList(
    stocks: Map<JuiceType, StockRow>
  ): Map<JuiceType, StockRow> {
    const buyableList = new Map<JuiceType, StockRow>();
    for (const [juiceType, stock] of stocks) {
      if (
        this.isBuyableJuice(juiceType) &&
        this.overEqualBalance(stock.juice.price)
      ) {
        buyableList.set(juiceType, {
          juice: stock.juice,
          quantity: stock.quantity,
        });
      }
    }

    return buyableList;
  }
}
