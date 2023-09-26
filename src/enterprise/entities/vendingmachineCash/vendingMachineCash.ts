import { IVendingMachineCash } from '@/enterprise/entities/vendingmachineCash/iVendingMachineCash';

export class VendingMachineCash implements IVendingMachineCash {
  constructor(
    private internalBalance: number = 0,
    private internalEarning: number = 0
  ) {}

  // 投入された合計金額
  get balance(): number {
    return this.internalBalance;
  }

  set balance(balance: number) {
    this.internalBalance = balance;
  }

  // 売上
  get earning(): number {
    return this.internalEarning;
  }

  set earning(earning: number) {
    this.internalEarning = earning;
  }
}
