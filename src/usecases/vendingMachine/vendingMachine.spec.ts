import { VendingMachine } from './vendingMachine';
import { MoneyType } from '../../domain/objects/moneyType';
import { JuiceType, JuiceData } from '../../domain/objects/juiceType';
import { Display } from '../display/display';
import { Juice } from '../../domain/entities/juice';

describe('vendingMachine', () => {
  let vm!: VendingMachine;
  let d!: Display;

  beforeEach(() => {
    // テスト前にVendingMachineのインスタンスを作成する
    vm = new VendingMachine();
    d = new Display();
  });

  it('10円を投入', () => {
    vm.post(MoneyType.TEN);
    expect(vm.Cash.balance).toBe(10);
  });

  it('50円を投入', () => {
    vm.post(MoneyType.FIFTY);
    expect(vm.Cash.balance).toBe(50);
  });

  it('100円を投入', () => {
    vm.post(MoneyType.HUNDRED);
    expect(vm.Cash.balance).toBe(100);
  });

  it('500円を投入', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(vm.Cash.balance).toBe(500);
  });

  it('1000円を投入', () => {
    vm.post(MoneyType.THOUSAND);
    expect(vm.Cash.balance).toBe(1000);
  });

  it('複数回(10回)10円を投入', () => {
    for (let i = 0; i < 10; i++) {
      vm.post(MoneyType.TEN);
    }
    expect(vm.Cash.balance).toBe(100);
  });

  it('おつりを出す', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(vm.Cash.balance).toBe(500);
    expect(vm.refund()).toBe(500);
  });

  it('使えないお金(1円)を返金する', () => {
    expect(vm.post(MoneyType.FIVE)).toBe(5);
    expect(vm.Cash.balance).toBe(0);
  });

  it('使えないお金(5円)を返金する', () => {
    expect(vm.post(MoneyType.ONE)).toBe(1);
    expect(vm.Cash.balance).toBe(0);
  });

  it('使えないお金(5000円)を返金する', () => {
    expect(vm.post(MoneyType.FIVE_THOUSAND)).toBe(5000);
    expect(vm.Cash.balance).toBe(0);
  });

  it('使えないお金(1万円)を返金する', () => {
    expect(vm.post(MoneyType.TEN_THOUSAND)).toBe(10000);
    expect(vm.Cash.balance).toBe(0);
  });

  it('購入可能なドリンクのリストを取得する', () => {
    vm.post(MoneyType.HUNDRED);
    vm.post(MoneyType.FIFTY);
    expect(vm.Cash.balance).toBe(150);
    expect(vm.acquireBuyableList(vm.Stock.stocks)).toEqual([
      new Juice(JuiceType.COKE, JuiceData[JuiceType.COKE].price),
      new Juice(JuiceType.WATER, JuiceData[JuiceType.WATER].price),
    ]);
  });

  it('コーラを購入する', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(vm.Cash.balance).toBe(500);
    expect(vm.buying(JuiceType.COKE)).toBe(380);
    expect(vm.Cash.balance).toBe(0);
  });

  it('売上を確認する', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    vm.buying(JuiceType.COKE);
    expect(vm.Cash.earning).toBe(120);
  });
});
