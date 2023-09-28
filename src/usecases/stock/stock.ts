import { Juice } from '../../domain/entities/juice';
import { JuiceType, JuiceData } from '../../domain/objects/juiceType';
import { IStock } from './iStock';

export type StockRow = {
  juice: Juice;
  quantity: number;
};

export class Stock implements IStock {
  private internalStocks = new Map<
    JuiceType,
    { juice: Juice; quantity: number }
  >();

  add(juice: Juice, quantity: number) {
    this.internalStocks.set(juice.type, { juice, quantity });
    return this.stocks.has(juice.type);
  }

  get stocks() {
    return this.internalStocks;
  }

  getStockQuantity(juiceType: JuiceType): number {
    if (!this.stocks.has(juiceType)) {
      return 0;
    }
    return this.stocks.get(juiceType)!.quantity;
  }
  getStockJuice(juiceType: JuiceType): Juice {
    return this.stocks.get(juiceType)!.juice;
  }
}
