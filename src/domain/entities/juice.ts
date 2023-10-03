import { JuiceData, JuiceType } from '../objects/juiceType';

export class Juice {
  constructor(
    private internalType: JuiceType,
    private internalPrice: number
  ) {}

  get name(): string {
    return JuiceData[this.type].name;
  }
  get type(): JuiceType {
    return this.internalType;
  }

  get price(): number {
    return this.internalPrice;
  }

  set price(price: number) {
    this.internalPrice = price;
  }
}

export type JuiceInfo = {
  name: string;
  price: number;
  quantity: number;
};
