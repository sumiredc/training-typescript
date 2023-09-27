import { Juice } from '../../domain/entities/juice';
import { JuiceData, JuiceType } from '../../domain/objects/juiceType';
import { Stock } from './stock';

describe('stock', () => {
  let s!: Stock;

  beforeEach(() => {
    // テスト前にstockのインスタンスを作成する
    s = new Stock();
  });

  it('在庫を追加', () => {
    const juice = new Juice(JuiceType.COKE, JuiceData[JuiceType.COKE].price);

    expect(s.addStock(juice, 5)).toBe(true);
  });

  it('在庫を取得する', () => {
    const juice = new Juice(JuiceType.COKE, JuiceData[JuiceType.COKE].price);

    s.addStock(juice, 5);
    expect(s.stocks).toEqual(
      new Map([[JuiceType.COKE, { juice, quantity: 5 }]])
    );
  });

  it('在庫をチェックする', () => {
    const juice = new Juice(JuiceType.COKE, JuiceData[JuiceType.COKE].price);
    s.addStock(juice, 5);
    expect(s.checkStockCondition(JuiceType.COKE)).toBe(true);
  });
});
