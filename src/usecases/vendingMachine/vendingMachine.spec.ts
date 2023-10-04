import { VendingMachine } from './vendingMachine';
import { MoneyType } from '../../domain/objects/moneyType';
import { JuiceType } from '../../domain/objects/juiceType';
import { Stock, StockRow } from '../stock/stock';
import { Juice } from '../../domain/entities/juice';

let vm!: VendingMachine;
let s!: Stock;
const coke = new Juice(JuiceType.COKE, 120);
const redBull = new Juice(JuiceType.REDBULL, 200);
const water = new Juice(JuiceType.WATER, 100);

describe.each([
  [MoneyType.ONE, 1],
  [MoneyType.FIVE, 5],
  [MoneyType.TEN, 0],
  [MoneyType.FIFTY, 0],
  [MoneyType.HUNDRED, 0],
  [MoneyType.FIVE_HUNDRED, 0],
  [MoneyType.THOUSAND, 0],
  [MoneyType.FIVE_THOUSAND, 5000],
  [MoneyType.TEN_THOUSAND, 10000],
])('お金を投入', (MoneyType: MoneyType, expected: number) => {
  it(`post ${MoneyType}`, () => {
    vm = new VendingMachine();
    s = new Stock();
    expect(vm.post(MoneyType)).toBe(expected);
  });
});

it('おつりを出す', () => {
  vm.post(MoneyType.FIVE_HUNDRED);
  expect(vm.refund()).toBe(500);
});

describe('ジュースが購入可能かどうか判断する', () => {
  const s = new Stock();
  const vm = new VendingMachine(undefined, s);
  const mockedIsNotSoldOut = jest.spyOn(s, 'isNotSoldOut');
  const mockedIsOrverEqualPrice = jest.spyOn(s, 'isOverEqualPrice');

  it('testが成功する場合', () => {
    mockedIsNotSoldOut.mockReturnValue(true);
    mockedIsOrverEqualPrice.mockReturnValue(true);
    expect(vm.isBuyableJuice(JuiceType.COKE, 120)).toBe(true);
  });
  it('testが失敗する場合', () => {
    mockedIsNotSoldOut.mockReturnValue(false);
    mockedIsOrverEqualPrice.mockReturnValue(true);
    expect(vm.isBuyableJuice(JuiceType.COKE, 120)).toBe(false);
  });
});

describe('コーラを購入する', () => {
  const s = new Stock();
  const vm = new VendingMachine(undefined, s);
  const mockedIsBuyabaleJuice = jest.spyOn(vm, 'isBuyableJuice');
  const mockedHasStock = jest.spyOn(s, 'hasStock');
  it('testが成功する場合', () => {
    mockedIsBuyabaleJuice.mockReturnValue(true);
    mockedHasStock.mockReturnValue(true);
    expect(vm.buying(JuiceType.COKE)).toBe(true);
  });
  it('testが失敗する場合', () => {
    mockedIsBuyabaleJuice.mockReturnValue(false);
    mockedHasStock.mockReturnValue(true);
    expect(vm.buying(JuiceType.COKE)).toBe(false);
  });
});

describe('購入可能なドリンクのリストを取得する', () => {
  const stockList: Map<JuiceType, StockRow> = new Map([
    [JuiceType.COKE, { juice: coke, quantity: 5 }],
    [JuiceType.REDBULL, { juice: redBull, quantity: 5 }],
    [JuiceType.WATER, { juice: water, quantity: 5 }],
  ]);

  const s = new Stock();
  const vm = new VendingMachine(undefined, s);
  const mockedIsBuyabaleJuice = jest.spyOn(vm, 'isBuyableJuice');

  it('testが成功する場合', () => {
    mockedIsBuyabaleJuice.mockReturnValue(true);
    expect(vm.acquireBuyableList(stockList)).toEqual([
      {
        name: 'コーラ',
        price: 120,
        quantity: 5,
      },
      {
        name: 'レッドブル',
        price: 200,
        quantity: 5,
      },
      {
        name: '水',
        price: 100,
        quantity: 5,
      },
    ]);
  });
  it('testが失敗する場合', () => {
    mockedIsBuyabaleJuice.mockReturnValue(false);
    expect(vm.acquireBuyableList(stockList)).toEqual([]);
  });
});
