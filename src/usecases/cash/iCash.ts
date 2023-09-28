export interface ICash {
  get balance(): number;

  set balance(balance: number);

  get earning(): number;

  set earning(earning: number);
}
