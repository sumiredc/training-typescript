import { ICash } from './iCash';

export class Cash implements ICash {
  private internalBalance: number = 0;
  private internalEarning: number = 0;

  get balance(): number {
    return this.internalBalance;
  }

  get earning(): number {
    return this.internalEarning;
  }

  private isNaturalNumber(n: number): boolean {
    if (n < 1 || n % 1 !== 0) {
      throw new Error('nは自然数のみ指定できます');
    }
    return true;
  }

  addBalance(n: number): number {
    this.isNaturalNumber(n);
    this.internalBalance += n;
    return this.internalBalance;
  }

  subBalance(n: number): number {
    this.isNaturalNumber(n);
    this.internalBalance -= n;
    return this.internalBalance;
  }

  addEarning(n: number): number {
    this.isNaturalNumber(n);
    this.internalEarning += n;
    return this.internalEarning;
  }

  subEarning(n: number): number {
    this.isNaturalNumber(n);
    this.internalEarning -= n;
    return this.internalEarning;
  }

  resetBalance(): number {
    this.internalBalance = 0;
    return this.internalBalance;
  }
}
