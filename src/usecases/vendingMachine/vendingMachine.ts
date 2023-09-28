import { Juice } from '../../domain/entities/juice';
import { JuiceData, JuiceType } from '../../domain/objects/juiceType';
import { MoneyType } from '../../domain/objects/moneyType';
import { IVendingMachine } from './iVendingMachine';
import { Cash } from '../cash/cash';
import { Stock } from '../stock/stock';

const validMoney: MoneyType[] = [
  MoneyType.TEN,
  MoneyType.FIFTY,
  MoneyType.HUNDRED,
  MoneyType.FIVE_HUNDRED,
  MoneyType.THOUSAND,
];

export class VendingMachine implements IVendingMachine {
  Cash = new Cash();
  Stock = new Stock();

  constructor() {
    this.Stock.addStock(
      new Juice(JuiceType.COKE, JuiceData[JuiceType.COKE].price),
      5
    );
    this.Stock.addStock(
      new Juice(JuiceType.REDBULL, JuiceData[JuiceType.REDBULL].price),
      5
    );
    this.Stock.addStock(
      new Juice(JuiceType.WATER, JuiceData[JuiceType.WATER].price),
      5
    );
  }

  post(money: MoneyType): number {
    if (validMoney.includes(money)) {
      this.Cash.balance += money;
      return 0;
    } else {
      return money;
    }
  }

  refund(): number {
    const change: number = this.Cash.balance;
    this.Cash.balance = 0;
    return change;
  }

  buying(juiceType: JuiceType): number {
    const { juice, quantity } = this.Stock.stocks.get(juiceType)!;

    if (
      this.Stock.checkStockCondition(juiceType) &&
      this.Cash.checkMoneyCondition(juice.price)
    ) {
      this.Stock.stocks.set(juiceType, { juice, quantity: quantity - 1 });
      this.Cash.balance -= juice.price;
      this.Cash.earning += juice.price;
    }
    return this.refund();
  }

  checkStockCondition(juiceType: JuiceType): boolean {
    if (!this.Stock.stocks.has(juiceType)) {
      return false;
    } else {
      const { juice, quantity } = this.Stock.stocks.get(juiceType)!;
      return quantity >= 1;
    }
  }

  checkMoneyCondition(price: number): boolean {
    return this.Cash.balance >= price;
  }

  acquireBuyableList(
    stocks: Map<JuiceType, { juice: Juice; quantity: number }>
  ): Map<JuiceType, { juice: Juice; quantity: number }> {
    const buyableList = new Map<
      JuiceType,
      { juice: Juice; quantity: number }
    >();
    for (const [juiceType, stock] of stocks) {
      if (
        this.checkStockCondition(juiceType) &&
        this.checkMoneyCondition(stock.juice.price)
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
