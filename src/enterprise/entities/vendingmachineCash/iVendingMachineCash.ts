export interface IVendingMachineCash {
  get balance(): number;
  set balance(v: number);

  get earning(): number;
  set earning(v: number);
}
