import {VendingMachine} from '../vendingMachine';
describe('vendingMachine', () => {
  let vm!: VendingMachine;

  beforeEach(() => {
    // テスト前にVendingMachineのインスタンスを作成する
    vm = new VendingMachine();
  });

  it('10円を投入', () => {
    vm.post(10)
    expect(vm.balance).toBe(10);
    
  });

  it('払い戻し', () => {
    vm.post(10)
    expect(vm.refund()).toBe(10);
    expect(vm.balance).toBe(0);
    
  });

});
