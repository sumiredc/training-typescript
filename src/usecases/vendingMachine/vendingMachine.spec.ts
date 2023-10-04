import { VendingMachine } from './vendingMachine';
import { MoneyType } from '../../domain/objects/moneyType';
import { JuiceType } from '../../domain/objects/juiceType';
import { Stock } from '../stock/stock';
let vm!: VendingMachine;
let s!: Stock;

beforeEach(() => {
  // テスト前にVendingMachineのインスタンスを作成する
  vm = new VendingMachine();
  s = new Stock();
});

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
    expect(vm.post(MoneyType)).toBe(expected);
  });
});

it('おつりを出す', () => {
  vm.post(MoneyType.FIVE_HUNDRED);
  expect(vm.refund()).toBe(500);
});

describe('ジュースが購入可能かどうか判断する', () => {
  const mockedIsNotSoldOout = jest.spyOn(s, 'isNotSoldOut');
  const mockedIsOrverEqualPrice = jest.spyOn(s, 'isOverEqualPrice');

  it('testが成功する場合', () => {
    mockedIsNotSoldOout.mockResolvedValue(true);
    mockedIsOrverEqualPrice.mockResolvedValue(true);
      }
    );
    expect(mockedIsNotSoldOout).toBe(true);
  });
});

it('購入可能なドリンクのリストを取得する', () => {
  vm.post(MoneyType.HUNDRED);
  vm.post(MoneyType.FIFTY);
  expect(vm.cash.balance).toBe(150);
  expect(vm.acquireBuyableList(vm.stock.stocks)).toEqual(
    new Map([
      [
        JuiceType.COKE,
        {
          juice: vm.stock.getStockJuice(JuiceType.COKE),
          quantity: vm.stock.getStockQuantity(JuiceType.COKE),
        },
      ],
      [
        JuiceType.WATER,
        {
          juice: vm.stock.getStockJuice(JuiceType.WATER),
          quantity: vm.stock.getStockQuantity(JuiceType.WATER),
        },
      ],
    ])
  );
});

it('コーラを購入する', () => {
  vm.post(MoneyType.FIVE_HUNDRED);
  expect(vm.cash.balance).toBe(500);
  expect(vm.buying(JuiceType.COKE)).toBe(true);
  expect(vm.cash.balance).toBe(380);
});

it('売上を確認する', () => {
  vm.post(MoneyType.FIVE_HUNDRED);
  vm.buying(JuiceType.COKE);
  expect(vm.cash.earning).toBe(120);
});
