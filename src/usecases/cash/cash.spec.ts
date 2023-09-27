import { Cash } from './cash';

describe('cash', () => {
  let c!: Cash;

  beforeEach(() => {
    // テスト前にcashのインスタンスを作成する
    c = new Cash();
  });

  it('投入金額を取得', () => {
    c.balance = 150;
    expect(c.balance).toBe(150);
  });

  it('売上金額を取得', () => {
    c.earning = 150;
    expect(c.earning).toBe(150);
  });

  it('金額のチェックを行う', () => {
    c.balance = 150;
    expect(c.balance).toBe(150);
    expect(c.checkMoneyCondition(100)).toEqual(true);
  });
});
