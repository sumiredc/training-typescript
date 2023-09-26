import { JuiceType } from '@/enterprise/objects/juiceType';

export interface IJuice {
  get type(): JuiceType;

  get name(): string;

  get price(): number;

  set price(price: number);

  get jpy(): string;
}
