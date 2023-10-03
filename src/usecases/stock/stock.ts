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

  sub(juiceType: JuiceType): StockRow {
    if (!this.hasStock(juiceType) || this.isSoldOut(juiceType)) {
      throw new Error('指定されたジュースは存在しません');
    }
    const stock = this.getStock(juiceType)!;
    stock.quantity--;
    return stock;
  }

  get stocks() {
    return this.internalStocks;
  }

  hasStock(juiceType: JuiceType): boolean {
    return this.stocks.has(juiceType);
  }

  getStockQuantity(juiceType: JuiceType): number {
    if (this.hasStock(juiceType)) {
      return this.stocks.get(juiceType)!.quantity;
    }
    return 0;
  }

  getStockJuice(juiceType: JuiceType): Juice | null {
    if (!this.stocks.has(juiceType)) {
      return null;
    }
    return this.stocks.get(juiceType)!.juice;
  }

  getStock(juiceType: JuiceType): StockRow | undefined {
    return this.stocks.get(juiceType);
  }

  isNotSoldOut(juiceType: JuiceType) {
    return this.getStockQuantity(juiceType) > 0;
  }

  isSoldOut(juiceType: JuiceType) {
    return !this.isNotSoldOut(juiceType);
  }

  isOverEqualPrice(juiceType: JuiceType, balance: number): boolean {
    if (!this.stocks.has(juiceType)) {
      return false;
    }
    return this.getStockJuice(juiceType)!.price <= balance;
  }
}
