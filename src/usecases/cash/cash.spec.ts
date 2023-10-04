import { Cash } from './cash';

let c!: Cash;
beforeEach(() => {
  // テスト前にcashのインスタンスを作成する
  c = new Cash();
});

describe('cash', () => {
  it('売上金額を取得', () => {
    c.addEarning(150);
    expect(c.earning).toBe(150);
  });

  it('投入金額を追加', () => {
    expect(c.addBalance(150)).toBe(150);
  });

  it('投入金額を追加(無効)', () => {
    expect(() => c.addBalance(150.5)).toThrow('nは自然数のみ指定できます');
  });

  it('投入金額の削減', () => {
    c.addBalance(150);
    expect(c.subBalance(100)).toBe(50);
  });

  it('投入金額の削減（無効）', () => {
    c.addBalance(150);
    expect(() => c.subBalance(100.5)).toThrow('nは自然数のみ指定できます');
  });

  it('売上金額を追加', () => {
    c.addEarning(150);
    expect(c.earning).toBe(150);
  });
  it('売上金額を追加(無効)', () => {
    expect(() => c.addEarning(150.5)).toThrow('nは自然数のみ指定できます');
  });

  it('売上の削減', () => {
    c.addEarning(150);
    expect(c.subEarning(100)).toBe(50);
  });

  it('売上の削減（無効）', () => {
    c.addEarning(150);
    expect(() => c.subEarning(100.5)).toThrow('nは自然数のみ指定できます');
  });

  it('投入金額をリセット', () => {
    expect(c.resetBalance()).toBe(0);
  });
});

describe.each([
  [150, 150],
  [100, 100],
])('投入金額を取得する', (x: number, expected: number) => {
  it(`addBalance ${x}`, () => {
    expect(c.addBalance(x)).toBe(expected);
  });
});
