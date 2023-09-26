import { MoneyType } from '@/enterprise/objects/moneyType';
import { Juice } from '@/enterprise/entities/juice/juice';
import { JuiceType } from '@/enterprise/objects/juiceType';

import { IVendingMachine } from '@/usecases/vendingMachine/iVendingMachine';
import { IVendingMachineStock } from '@/enterprise/entities/vendintMachineStock/iVendingMachineStock';
import { IVendingMachineDisplay } from '@/enterprise/entities/vendingMachineDisplay/iVendingMachineDisplay';
import { IVendingMachineCash } from '@/enterprise/entities/vendingmachineCash/iVendingMachineCash';

const validMoney: MoneyType[] = [
  MoneyType.TEN,
  MoneyType.FIFTY,
  MoneyType.HUNDRED,
  MoneyType.FIVE_HUNDRED,
  MoneyType.THOUSAND,
];

export class VendingMachine implements IVendingMachine {
  constructor(
    private vendingMachineStock: IVendingMachineStock,
    private vendingMachineDisplay: IVendingMachineDisplay,
    private vendingMachineCash: IVendingMachineCash
  ) {
    this.initStock();
  }

  // 初期在庫
  private initStock() {
    this.vendingMachineStock.add(new Juice(JuiceType.COKE, 120), 5);
    this.vendingMachineStock.add(new Juice(JuiceType.REDBULL, 200), 5);
    this.vendingMachineStock.add(new Juice(JuiceType.WATER, 100), 5);
  }

  // お金を入れる
  post(money: MoneyType): number {
    if (validMoney.includes(money)) {
      this.vendingMachineCash.balance += money;
      return 0;
    } else {
      return money;
    }
  }

  // 返金する
  refund(): number {
    const change: number = this.vendingMachineCash.balance;
    this.vendingMachineCash.balance = 0;
    return change;
  }

  // 購入
  buying(juiceType: JuiceType): number {
    const { juice, quantity } = this.vendingMachineStock.stocks.get(juiceType)!;

    if (
      this.vendingMachineStock.checkBuyableDrink(
        juiceType,
        this.vendingMachineCash.balance
      )
    ) {
      this.vendingMachineStock.stocks.set(juiceType, {
        juice,
        quantity: quantity - 1,
      });
      this.vendingMachineCash.balance -= juice.price;
      this.vendingMachineCash.earning += juice.price;
    }
    return this.refund();
  }
}
