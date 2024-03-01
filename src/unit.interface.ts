export interface Unit {
  unitId: number | string;
  parentUnitId: number | string;
  value: number;
  name: string;
  isFractionable: boolean;
}
