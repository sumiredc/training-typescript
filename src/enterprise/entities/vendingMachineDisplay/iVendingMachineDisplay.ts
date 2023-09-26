import { JuiceType } from '@/enterprise/objects/juiceType';
import { Stock } from '../vendintMachineStock/iVendingMachineStock';

export interface IVendingMachineDisplay {
  stocksInfo(v: Map<JuiceType, Stock>): string[];
}
