import { Juice } from '../../domein/entities/juice';

describe('vendingMachine', () => {
  let ju!: Juice;

  beforeEach(() => {
    // テスト前にVendingMachineのインスタンスを作成する

    ju = new Juice('コーラ', 120, 5);
  });

  it('ジュースクラスの情報を取得', () => {
    expect(ju.juiceInfo()).toBe('name:コーラ price:￥120 stock:5本');
  });
});
