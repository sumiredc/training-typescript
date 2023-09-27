import { Juice } from '../../domain/entities/juice';
import { JuiceType } from '../../domain/objects/juiceType';
import { IStock } from './iStock';

export class Stock implements IStock {
  private internalStocks = new Map<
    JuiceType,
    { juice: Juice; quantity: number }
  >();

  addStock(juiceType: JuiceType, juice: Juice, quantity: number) {
    this.internalStocks.set(juiceType, { juice, quantity });
  }

  get stocks() {
    return this.internalStocks;
  }

  checkStockCondition(juiceType: JuiceType): boolean {
    if (!this.stocks.has(juiceType)) {
      return false;
    } else {
      const { juice, quantity } = this.stocks.get(juiceType)!;
      return quantity >= 1;
    }
  }
}
