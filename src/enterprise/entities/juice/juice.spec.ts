import { Juice } from './juice';

describe('vendingMachine', () => {
  let ju!: Juice;

  beforeEach(() => {
    // テスト前にJuiceのインスタンスを作成する
    ju = new Juice('コーラ', 120);
  });

  it('ジュースクラスの情報を取得', () => {
    expect(ju.jpy).toBe('￥120');
  });
});
