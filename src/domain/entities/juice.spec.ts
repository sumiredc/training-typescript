import { JuiceType } from '../objects/juiceType';
import { Juice } from './juice';

describe('juice', () => {
  let ju!: Juice;

  beforeEach(() => {
    // テスト前にJuiceのインスタンスを作成する
    ju = new Juice(JuiceType.COKE, 120);
  });
});
