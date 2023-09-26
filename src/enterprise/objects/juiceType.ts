export enum JuiceType {
  COKE = 0,
  REDBULL = 1,
  WATER = 2,
}

export type JuiceDataType = {
  name: string;
};

export const juiceData: { [key: number]: JuiceDataType } = {
  0: {
    name: 'コーラ',
  },
  1: {
    name: 'レッドブル',
  },
  2: {
    name: '水',
  },
};
