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
      JuiceType.COKE,
      new Juice(
        JuiceData[JuiceType.COKE].name,
        JuiceData[JuiceType.COKE].price
      ),
      5
    );
    this.Stock.addStock(
      JuiceType.REDBULL,
      new Juice(
        JuiceData[JuiceType.REDBULL].name,
        JuiceData[JuiceType.REDBULL].price
      ),
      5
    );
    this.Stock.addStock(
      JuiceType.WATER,
      new Juice(
        JuiceData[JuiceType.WATER].name,
        JuiceData[JuiceType.WATER].price
      ),
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
}
