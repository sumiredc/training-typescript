import {VendingMachine} from '../vendingMachine';
describe('vendingMachine', () => {
  let vm!: VendingMachine;
  beforeEach(() => {
    // テスト前にVendingMachineのインスタンスを作成する
    vm = new VendingMachine();
  });

  it('sample', () => {
    expect(true).toBeTruthy();
  });
});
