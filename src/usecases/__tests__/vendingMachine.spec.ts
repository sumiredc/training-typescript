import { VendingMachine } from '../vendingMachine/vendingMachine';
import { MoneyType } from '../../domain/objects/moneyType';
import { JuiceType } from '../../domain/objects/juiceType';
import { Display } from '../display/display';
import { Cash } from '../cash/cash';
import { Stock } from '../stock/stock';

describe('vendingMachine', () => {
  let vm!: VendingMachine;
  let d!: Display;
  let s!: Stock;
  let c!: Cash;

  beforeEach(() => {
    // テスト前にVendingMachineのインスタンスを作成する
    vm = new VendingMachine();
    d = new Display();
    c = new Cash();
    s = new Stock();
  });

  it('10円を投入', () => {
    vm.post(MoneyType.TEN);
    expect(c.balance).toBe(10);
  });

  it('50円を投入', () => {
    vm.post(MoneyType.FIFTY);
    expect(c.balance).toBe(50);
  });

  it('100円を投入', () => {
    vm.post(MoneyType.HUNDRED);
    expect(c.balance).toBe(100);
  });

  it('500円を投入', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(c.balance).toBe(500);
  });

  it('1000円を投入', () => {
    vm.post(MoneyType.THOUSAND);
    expect(c.balance).toBe(1000);
  });

  it('複数回(10回)10円を投入', () => {
    for (let i = 0; i < 10; i++) {
      vm.post(MoneyType.TEN);
    }
    expect(c.balance).toBe(100);
  });

  it('おつりを出す', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(c.balance).toBe(500);
    expect(vm.refund()).toBe(500);
  });

  it('使えないお金(1円)を返金する', () => {
    expect(vm.post(MoneyType.FIVE)).toBe(5);
    expect(c.balance).toBe(0);
  });

  it('使えないお金(5円)を返金する', () => {
    expect(vm.post(MoneyType.ONE)).toBe(1);
    expect(c.balance).toBe(0);
  });

  it('使えないお金(5000円)を返金する', () => {
    expect(vm.post(MoneyType.FIVE_THOUSAND)).toBe(5000);
    expect(c.balance).toBe(0);
  });

  it('使えないお金(1万円)を返金する', () => {
    expect(vm.post(MoneyType.TEN_THOUSAND)).toBe(10000);
    expect(c.balance).toBe(0);
  });

  it('自販機内に格納される飲み物の情報を取得する', () => {
    expect(d.stocksInfo(s.stocks)).toEqual([
      'name:コーラ price:￥120 stock:5本',
      'name:レッドブル price:￥200 stock:5本',
      'name:水 price:￥100 stock:5本',
    ]);
  });

  it('購入可能なドリンクのリストを取得する', () => {
    vm.post(MoneyType.HUNDRED);
    vm.post(MoneyType.FIFTY);
    expect(d.acquireBuyableList(s.stocks)).toEqual([
      'name:コーラ price:￥120 stock:5本',
      'name:水 price:￥100 stock:5本',
    ]);
  });

  it('コーラを購入する', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(c.balance).toBe(500);
    expect(vm.buying(JuiceType.COKE)).toBe(380);
    expect(c.balance).toBe(0);
    expect(d.stocksInfo(s.stocks)).toEqual([
      'name:コーラ price:￥120 stock:4本',
      'name:レッドブル price:￥200 stock:5本',
      'name:水 price:￥100 stock:5本',
    ]);
  });

  it('売上を確認する', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    vm.buying(JuiceType.COKE);
    expect(c.earning).toBe(120);
  });
});
