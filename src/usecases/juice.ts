export class Juice {
  private internalName: string;
  private internalPrice: number;
  private internalStocks: number;

  constructor(name: string, price: number, stocks: number) {
    this.internalName = name;

    this.internalPrice = price;

    this.internalStocks = stocks;
  }

  get name(): string {
    return this.internalName;
  }

  get price(): number {
    return this.internalPrice;
  }

  get stocks(): number {
    return this.internalStocks;
  }
}
