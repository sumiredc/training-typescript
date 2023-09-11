import {VendingMachine} from '../vendingMachine';
describe('vendingMachine', () => {
  let vm!: VendingMachine;

  beforeEach(() => {
    // テスト前にVendingMachineのインスタンスを作成する
    vm = new VendingMachine();
  });

  it('各種お金を投入', () => {
    vm.post(10)
    vm.post(50)
    vm.post(100)
    vm.post(1000)
    expect(vm.balance).toBe(1160);
    
  });

  it('払い戻し', () => {
    vm.post(10)
    expect(vm.refund()).toBe(10);
    expect(vm.balance).toBe(0);
    
  });

});
