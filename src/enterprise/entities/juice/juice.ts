import {
  JuiceType,
  juiceData,
  JuiceDataType,
} from '@/enterprise/objects/juiceType';
import { IJuice } from './iJuice';

export class Juice implements IJuice {
  private data: JuiceDataType;

  constructor(
    private internalType: JuiceType,
    private internalPrice: number
  ) {
    this.data = juiceData[this.internalType];
  }

  get type(): JuiceType {
    return this.internalType;
  }

  get name(): string {
    return this.data.name;
  }

  get price(): number {
    return this.internalPrice;
  }

  set price(price: number) {
    this.internalPrice = price;
  }

  // 日本円表記で取得
  get jpy(): string {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(this.price);
  }
}
