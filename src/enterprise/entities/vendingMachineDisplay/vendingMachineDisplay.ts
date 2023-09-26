import { Juice } from '@/enterprise/entities/juice/juice';
import { JuiceType } from '@/enterprise/objects/juiceType';
import { IVendingMachineDisplay } from '@/enterprise/entities/vendingMachineDisplay/iVendingMachineDisplay';
import { Stock } from '../vendintMachineStock/iVendingMachineStock';

export class VendingMachineDisplay implements IVendingMachineDisplay {
  // 在庫状況の取得
  stocksInfo(stocks: Map<JuiceType, Stock>): string[] {
    const stocksInfo: string[] = [];
    for (const [_, stock] of stocks) {
      stocksInfo.push(this.makeStockInfoRow(stock.juice, stock.quantity));
    }
    return stocksInfo;
  }

  // 在庫状況の１行を生成
  private makeStockInfoRow(juice: Juice, quantity: number): string {
    return juice.jpy + ` stock:${quantity}本`;
  }
}
