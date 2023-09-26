import { IDisplay } from './iDisplay';
import { Stock } from '../stock/stock';
import { Cash } from '../cash/cash';
import { JuiceType } from '../../domain/objects/juiceType';
import { Juice } from '../../domain/entities/juice';

export class Display implements IDisplay {
  Cash = new Cash();
  Stock = new Stock();

  makeStockInfoRow(juice: Juice, quantity: number) {
    return juice.juiceInfo() + ` stock:${quantity}本`;
  }

  stocksInfo(stocks: Map<JuiceType, { juice: Juice; quantity: number }>) {
    const stocksInfo: string[] = [];
    for (const [_, stock] of stocks) {
      stocksInfo.push(this.makeStockInfoRow(stock.juice, stock.quantity));
    }
    return stocksInfo;
  }

  acquireBuyableList(
    stocks: Map<JuiceType, { juice: Juice; quantity: number }>
  ) {
    const buyableList: string[] = [];
    for (const [juiceType, stock] of stocks) {
      if (
        this.Stock.checkStockCondition(juiceType) &&
        this.Cash.checkMoneyCondition(stock.juice.price)
      ) {
        buyableList.push(this.makeStockInfoRow(stock.juice, stock.quantity));
      }
    }

    return buyableList;
  }
}
