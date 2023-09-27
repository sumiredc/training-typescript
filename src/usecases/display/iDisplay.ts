import { Juice, JuiceInfo } from '../../domain/entities/juice';
import { JuiceType } from '../../domain/objects/juiceType';

export interface IDisplay {
  makeJuiceInfo(juice: Juice, quantity: number): JuiceInfo;

  stocksInfo(
    stocks: Map<JuiceType, { juice: Juice; quantity: number }>
  ): JuiceInfo[];
}
