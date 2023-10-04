import { Juice } from '../../domain/entities/juice';
import { JuiceType } from '../../domain/objects/juiceType';
import { Stock } from './stock';

let s!: Stock;
let coke!: Juice;
let redBull!: Juice;
let water!: Juice;

beforeEach(() => {
  // テスト前にstockのインスタンスを作成する
  s = new Stock();
  coke = new Juice(JuiceType.COKE, 120);
  redBull = new Juice(JuiceType.REDBULL, 200);
  water = new Juice(JuiceType.WATER, 100);
  s.add(coke, 5);
});

describe.each([
  [redBull, 5, true],
  [water, 5, true],
])('在庫を追加', (x: Juice, n: number, expected: boolean) => {
  it(`add ${x} ${n}`, () => {
    expect(s.add(x, n)).toBe(expected);
  });
});

it('在庫を減らす', () => {
  expect(s.sub(JuiceType.COKE)).toEqual({ juice: coke, quantity: 4 });
});

it('在庫を取得する', () => {
  expect(s.stocks).toEqual(
    new Map([[JuiceType.COKE, { juice: coke, quantity: 5 }]])
  );
});

describe.each([
  [JuiceType.COKE, true],
  [JuiceType.REDBULL, false],
  [JuiceType.WATER, false],
])(
  '在庫に飲み物が登録されているかどうかを確認',
  (JuiceType: JuiceType, expected: boolean) => {
    it(`hasStock ${JuiceType}`, () => {
      expect(s.hasStock(JuiceType)).toBe(expected);
    });
  }
);

describe.each([
  [JuiceType.COKE, 5],
  [JuiceType.REDBULL, 0],
  [JuiceType.WATER, 0],
])('ジュースの個数を取得', (JuiceType: JuiceType, expected: number) => {
  it(`getStockQuantity ${JuiceType}`, () => {
    expect(s.getStockQuantity(JuiceType)).toBe(expected);
  });
});

describe.each([
  [JuiceType.COKE, coke],
  [JuiceType.REDBULL, null],
  [JuiceType.WATER, null],
])('在庫からジュースを取得', (JuiceType: JuiceType, expected: Juice | null) => {
  it(`getStockJuice ${JuiceType}`, () => {
    expect(s.getStockJuice(JuiceType)).toEqual(expected);
  });
});

it('在庫の情報を取得', () => {
  expect(s.getStock(JuiceType.COKE)).toEqual({ juice: coke, quantity: 5 });
});

describe.each([
  [JuiceType.COKE, true],
  [JuiceType.REDBULL, false],
  [JuiceType.WATER, false],
])('売り切れかどうかの確認', (JuiceType: JuiceType, expected: boolean) => {
  it(`isNotSoldOut ${JuiceType}`, () => {
    expect(s.isNotSoldOut(JuiceType)).toEqual(expected);
  });
});

describe.each([
  [JuiceType.COKE, 100, false],
  [JuiceType.COKE, 120, true],
  [JuiceType.WATER, 0, false],
  [JuiceType.WATER, 200, false],
  [JuiceType.WATER, -100, false],
])(
  '投入金額が足りているかどうかの確認',
  (JuiceType: JuiceType, price: number, expected: boolean) => {
    it(`isOverEqualPrice ${JuiceType} ${price}`, () => {
      expect(s.isOverEqualPrice(JuiceType, price)).toEqual(expected);
    });
  }
);
