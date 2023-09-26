import { Juice } from '@/enterprise/entities/juice/juice';
import { JuiceType } from '@/enterprise/objects/juiceType';

export type Stock = { juice: Juice; quantity: number };

export interface IVendingMachineStock {
  get stocks(): Map<JuiceType, Stock>;
  add(juice: Juice, quantity: number): void;

  checkBuyableDrink(juiceType: JuiceType, balance: number): boolean;

  acquireBuyableList(balance: number): string[];
}
