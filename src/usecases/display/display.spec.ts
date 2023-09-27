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
  });
  it('ジュースの情報を取得する', () => {
    const coke = new Juice(JuiceType.COKE, JuiceData[JuiceType.COKE].price);
    expect(d.makeJuiceInfo(coke, 5)).toEqual({
      name: 'コーラ',
      price: 120,
      stock: 5,
    });
  });

  it('自販機内に格納される飲み物の情報を取得する', () => {
    const coke = new Juice(JuiceType.COKE, JuiceData[JuiceType.COKE].price);
    const redbull = new Juice(
      JuiceType.REDBULL,
      JuiceData[JuiceType.REDBULL].price
    );
    const water = new Juice(JuiceType.WATER, JuiceData[JuiceType.WATER].price);
    s.addStock(coke, 5);
    s.addStock(redbull, 5);
    s.addStock(water, 5);
    expect(d.stocksInfo(s.stocks)).toEqual([
      {
        name: JuiceData[JuiceType.COKE].name,
        price: JuiceData[JuiceType.COKE].price,
        stock: 5,
      },
      {
        name: JuiceData[JuiceType.REDBULL].name,
        price: JuiceData[JuiceType.REDBULL].price,
        stock: 5,
      },
      {
        name: JuiceData[JuiceType.WATER].name,
        price: JuiceData[JuiceType.WATER].price,
        stock: 5,
      },
    ]);
  });
});
