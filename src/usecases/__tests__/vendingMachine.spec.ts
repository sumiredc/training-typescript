import {VendingMachine} from '../vendingMachine';
import {MoneyType} from '../money';

describe('vendingMachine', () => {
  let vm!: VendingMachine;

  beforeEach(() => {
    // テスト前にVendingMachineのインスタンスを作成する
    vm = new VendingMachine();
  });

  it('10円を投入', () => {
    vm.post(MoneyType.TEN);
    expect(vm.balance).toBe(10);
  });

  it('50円を投入', () => {
    vm.post(MoneyType.FIFTY);
    expect(vm.balance).toBe(50);
  });

  it('100円を投入', () => {
    vm.post(MoneyType.HUNDRED);
    expect(vm.balance).toBe(100);
  });

  it('500円を投入', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(vm.balance).toBe(500);
  });

  it('1000円を投入', () => {
    vm.post(MoneyType.THOUSAND);
    expect(vm.balance).toBe(1000);
  });

  it('複数回(10回)10円を投入', () => {
    for (let i = 0; i < 10; i++) {
      vm.post(MoneyType.TEN);
    }
    expect(vm.balance).toBe(100);
  });

  it('おつりを出す', () => {
    vm.post(MoneyType.TEN);
    expect(vm.refund()).toBe(10);
    expect(vm.balance).toBe(0);
  });

  it('使えないお金を返金する', () => {
    vm.post(MoneyType.TEN);
    expect(vm.refund()).toBe(10);
    expect(vm.post(5)).toBe(5);
  });
});
