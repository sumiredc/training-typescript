import { VendingMachine } from '../vendingMachine';
import { MoneyType } from '../../domein/objects/moneyType';
import { JuiceType } from '../../domein/objects/juiceType';

describe('vendingMachine', () => {
  let vm!: VendingMachine;

  beforeEach(() => {
    // テスト前にVendingMachineのインスタンスを作成する

    vm = new VendingMachine(0, 0);
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

  it('使えないお金(1円)を返金する', () => {
    expect(vm.post(MoneyType.FIVE)).toBe(5);
    expect(vm.balance).toBe(0);
  });

  it('使えないお金(5円)を返金する', () => {
    expect(vm.post(MoneyType.ONE)).toBe(1);
    expect(vm.balance).toBe(0);
  });

  it('使えないお金(5000円)を返金する', () => {
    expect(vm.post(MoneyType.FIVE_THOUSAND)).toBe(5000);
    expect(vm.balance).toBe(0);
  });

  it('使えないお金(1万円)を返金する', () => {
    expect(vm.post(MoneyType.TEN_THOUSAND)).toBe(10000);
    expect(vm.balance).toBe(0);
  });

  it('自販機内に格納される飲み物の情報を取得する', () => {
    expect(vm.stocksInfo()).toEqual(['name:コーラ price:￥120 stock:5本']);
  });

  it('コーラが買えるかどうか判断する', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(vm.checkBuyingCondition(JuiceType.COKE)).toEqual(true);
  });

  it('コーラを購入する', () => {
    vm.post(MoneyType.FIVE_HUNDRED);
    expect(vm.balance).toBe(500);
    vm.buying(JuiceType.COKE);
    expect(vm.balance).toBe(380);
    expect(vm.earning).toBe(120);
    expect(vm.stocksInfo()).toEqual(['name:コーラ price:￥120 stock:4本']);
  });
});
