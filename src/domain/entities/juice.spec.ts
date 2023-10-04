import { JuiceType } from '../objects/juiceType';
import { Juice } from './juice';

let ju!: Juice;
beforeEach(() => {
  // テスト前にJuiceのインスタンスを作成する
  ju = new Juice(JuiceType.COKE, 120);
});

describe('juice', () => {
  it('名前を取得', () => {
    expect(ju.name).toBe('コーラ');
  });
});
