import { Unit } from "./unit.interface";
import { convert, convertRaw } from "./unit_converter";

const units: Unit[] = [
  {
    name: "Litre",
    isFractionable: false,
    parentUnitId: 3,
    unitId: 4,
    value: 1,
  },
  {
    name: "Bottle",
    isFractionable: false,
    parentUnitId: 2,
    unitId: 3,
    value: 2,
  },
  {
    name: "Box",
    isFractionable: false,
    parentUnitId: 1,
    unitId: 2,
    value: 10,
  },
  {
    name: "Carton",
    isFractionable: false,
    parentUnitId: 0,
    unitId: 1,
    value: 24,
  },
  {
    name: "Container",
    isFractionable: false,
    parentUnitId: -1,
    unitId: 0,
    value: 200,
  },
];

let baseValue = 1101;
// baseValue = 551;
// baseValue = 44110001;
//1100 litre //550 bottles //55 boxes //2 carton 7box
//551 litres //275 bottles 1 litre //27 box 5 bottles 1 litre //1 carton 3 box 5 bottle 1 litre
//44110001 litres //22,055,000 bottles 1 litre //2,205,500 boxes 1 litre //91,895 carton 20 box 1 litre //459 containers 95 carton 20 box 1 litre

const baseUnitId = 4;
const beautifullString: string = convert(units, baseUnitId, baseValue);
console.log(beautifullString);

const convertedUnits: Unit[] = convertRaw(units, baseUnitId, baseValue);
console.log("Converted Units: ", convertedUnits);
