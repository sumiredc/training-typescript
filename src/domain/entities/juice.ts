export class Juice {
  constructor(
    private internalName: string,
    private internalPrice: number // private internalQuantity: number
  ) {}

  get name(): string {
    return this.internalName;
  }

  get price(): number {
    return this.internalPrice;
  }

  // get quantity(): number {
  //   return this.internalQuantity;
  // }

  set name(name: string) {
    this.internalName = name;
  }

  set price(price: number) {
    this.internalPrice = price;
  }

  // set quantity(quantity: number) {
  //   this.internalQuantity = quantity;
  // }

  juiceInfo(): string {
    return (
      'name:' +
      this.name +
      ' price:' +
      new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
      }).format(this.price)
    );
  }
}
