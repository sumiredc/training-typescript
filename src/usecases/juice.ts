export class Juice {
  private internalName: string;
  private internalPrice: number;
  private Quantity: number;

  constructor(name: string, price: number, quantity: number) {
    this.internalName = name;

    this.internalPrice = price;

    this.Quantity = quantity;
  }

  get name(): string {
    return this.internalName;
  }

  get price(): number {
    return this.internalPrice;
  }

  get quantity(): number {
    return this.Quantity;
  }

  set name(name: string) {
    this.internalName = name;
  }

  set price(price: number) {
    this.internalPrice = price;
  }

  set quantity(quantity: number) {
    this.Quantity = quantity;
  }

  juiceInfo(): string {
    return (
      'name:' + this.name + ' price:' + this.price + ' stock:' + this.quantity
    );
  }
}
