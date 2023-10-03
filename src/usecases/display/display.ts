import { IDisplay } from './iDisplay';
import { JuiceData, JuiceType } from '../../domain/objects/juiceType';
import { Juice, JuiceInfo } from '../../domain/entities/juice';

export class Display implements IDisplay {
  makeJuiceInfo(juice: Juice, quantity: number) {
    const juiceInfo: JuiceInfo = {
      name: JuiceData[juice.type].name,
      price: juice.price,
      stock: quantity,
    };
    return juiceInfo;
  }

  stocksInfo(
    stocks: Map<JuiceType, { juice: Juice; quantity: number }>
  ): JuiceInfo[] {
    const stocksInfo: JuiceInfo[] = [];
    for (const [_, stock] of stocks) {
      stocksInfo.push(this.makeJuiceInfo(stock.juice, stock.quantity));
    }
    return stocksInfo;
  }
}
