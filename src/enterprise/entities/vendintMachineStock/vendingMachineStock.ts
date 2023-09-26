import { Juice } from '@/enterprise/entities/juice/juice';
import { JuiceType } from '@/enterprise/objects/juiceType';
import {
  IVendingMachineStock,
  Stock,
} from '@/enterprise/entities/vendintMachineStock/iVendingMachineStock';

export class VendingMachineStock implements IVendingMachineStock {
  constructor(private internalStocks: Map<JuiceType, Stock> = new Map()) {}

  get stocks(): Map<JuiceType, Stock> {
    return this.internalStocks;
  }

  // 在庫の追加
  add(juice: Juice, quantity: number) {
    this.stocks.set(juice.type, {
      juice,
      quantity,
    });
  }

  // 指定したドリンクが購入できるか判定する
  checkBuyableDrink(juiceType: JuiceType, balance: number): boolean {
    if (!this.internalStocks.has(juiceType)) {
      return false;
    }
    const { juice, quantity } = this.internalStocks.get(juiceType)!;

    return balance >= juice.price && quantity >= 1;
  }

  // 購入可能なジュースの一覧
  acquireBuyableList(balance: number) {
    const buyableList: string[] = [];
    for (const [juiceType, stock] of this.stocks) {
      if (this.checkBuyableDrink(juiceType, balance)) {
        buyableList.push(this.makeStockInfoRow(stock.juice, stock.quantity));
      }
    }

    return buyableList;
  }

  // 在庫状況の１行を生成
  private makeStockInfoRow(juice: Juice, quantity: number): string {
    return juice.jpy + ` stock:${quantity}本`;
  }
}
