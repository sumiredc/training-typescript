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

  get stock(): number {
    return this.internalStock;
  }

  set name(name: string) {
    this.internalName = name;
  }

  set price(price: number) {
    this.internalPrice = price;
  }

  set stock(stock: number) {
    this.internalStock = stock;
  }

  juiceInfo(): string {
    return (
      'name:' + this.name + ' price:' + this.price + ' stock:' + this.stock
    );
  }
}
