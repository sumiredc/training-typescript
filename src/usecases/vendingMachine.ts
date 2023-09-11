export class VendingMachine {
  private internalBalance: number = 0;
  private validCoin: number[] = [10, 50, 100, 500, 1000];

  post(coin: number) {
    if (this.validCoin.includes(coin)) {
      this.internalBalance += coin;
    } else {
      return coin;
    }
  }

  get balance() {
    return this.internalBalance;
  }

  refund() {
    const change: number = this.internalBalance;
    this.internalBalance = 0;
    return change;
  }
}
