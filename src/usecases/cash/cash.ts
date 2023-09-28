import { ICash } from './iCash';

export class Cash implements ICash {
  private internalBalance: number = 0;
  private internalEarning: number = 0;

  get balance(): number {
    return this.internalBalance;
  }

  set balance(balance: number) {
    this.internalBalance = balance;
  }

  get earning(): number {
    return this.internalEarning;
  }

  set earning(earning: number) {
    this.internalEarning = earning;
  }
}
