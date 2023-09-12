export class Juice {
  private internalName: string;
  private internalPrice: number;
  private internalStock: number;

  constructor(name: string, price: number, stock: number) {
    this.internalName = name;

    this.internalPrice = price;

    this.internalStock = stock;
  }

  get name(): string {
    return this.internalName;
  }

  get price(): number {
    return this.internalPrice;
  }

  get stocks(): number {
    return this.internalStock;
  }
}
