import { Juice, JuiceInfo } from '../../domain/entities/juice';
import { JuiceData, JuiceType } from '../../domain/objects/juiceType';
import { Stock } from '../stock/stock';
import { Display } from './display';

describe('display', () => {
  let d!: Display;
  let s!: Stock;

  beforeEach(() => {
    // テスト前にstockのインスタンスを作成する
    d = new Display();
    s = new Stock();
    s.add(new Juice(JuiceType.COKE, 120), 5);
    s.add(new Juice(JuiceType.REDBULL, 200), 5);
    s.add(new Juice(JuiceType.WATER, 100), 5);
  });
  it('ジュースの情報を取得する', () => {
    expect(d.makeJuiceInfo(new Juice(JuiceType.COKE, 120), 5)).toEqual({
      name: 'コーラ',
      price: 120,
      quantity: 5,
    });
  });

  it('自販機内に格納される飲み物の情報を取得する', () => {
    expect(d.stocksInfo(s.stocks)).toEqual([
      {
        name: JuiceData[JuiceType.COKE].name,
        price: 120,
        quantity: 5,
      },
      {
        name: JuiceData[JuiceType.REDBULL].name,
        price: 200,
        quantity: 5,
      },
      {
        name: JuiceData[JuiceType.WATER].name,
        price: 100,
        quantity: 5,
      },
    ]);
  });
});
