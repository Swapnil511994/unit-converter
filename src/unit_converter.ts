import { Unit } from "./unit.interface";

//unit conversion logic goes here
export function convert(
  units: Unit[],
  baseUnitId: number | string,
  value: number
): string {
  try {
    if (units.length <= 0) throw new Error("No Units Provided For Conversion");

    let strToReturn: string = "";

    //check base unit id and find relevant base unit
    let baseUnit: Unit | null = null;
    let currentUnit: Unit | null = null;
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];
      if (unit.unitId === baseUnitId) {
        baseUnit = unit;
        break;
      }
    }

    if (!baseUnit || isNaN(baseUnit?.value))
      throw new Error("Invalid base unit id provided as argument");

    //base unit is stored in baseUnit Variable
    currentUnit = baseUnit;
    while (currentUnit !== null) {
      let parent: Unit | null = null;
      for (let i = 0; i < units.length; i++) {
        const supposedParent = units[i];
        if (supposedParent?.unitId === currentUnit?.parentUnitId) {
          parent = supposedParent;
          break;
        }
      }

      if (parent && !isNaN(parent?.value)) {
        if (parent.value <= value) {
          if (value % parent.value === 0 || parent.isFractionable) {
            //exact conversion
            value = value / parent.value;
          } else {
            const remaining = value % parent.value;
            value = Math.trunc(value / parent.value);
            if (remaining > 0) {
              strToReturn = `${remaining} ${currentUnit.name} ${strToReturn}`;
            }
          }
        } else {
          strToReturn = `${value} ${currentUnit.name} ${strToReturn}`;
          parent = null;
        }
      } else {
        if (value !== 0 && value >= currentUnit?.value) {
          strToReturn = `${value} ${currentUnit.name} ${strToReturn}`;
        }
      }

      currentUnit = parent;
    }

    return strToReturn;
  } catch (error) {
    console.error("Error: ", error);
    return "Unable to convert unit";
  }
}

export function convertRaw(
  units: Unit[],
  baseUnitId: number | string,
  value: number
): Unit[] {
  try {
    if (units.length <= 0) throw new Error("No Units Provided For Conversion");

    let unitsToReturn: Unit[] = [];

    //check base unit id and find relevant base unit
    let baseUnit: Unit | null = null;
    let currentUnit: Unit | null = null;
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];
      if (unit.unitId === baseUnitId) {
        baseUnit = unit;
        break;
      }
    }

    if (!baseUnit || isNaN(baseUnit?.value))
      throw new Error("Invalid base unit id provided as argument");

    //base unit is stored in baseUnit Variable
    currentUnit = baseUnit;
    while (currentUnit !== null) {
      let parent: Unit | null = null;
      for (let i = 0; i < units.length; i++) {
        const supposedParent = units[i];
        if (supposedParent?.unitId === currentUnit?.parentUnitId) {
          parent = supposedParent;
          break;
        }
      }

      if (parent && !isNaN(parent?.value)) {
        if (parent.value <= value) {
          if (value % parent.value === 0 || parent.isFractionable) {
            //exact conversion
            value = value / parent.value;
          } else {
            const remaining = value % parent.value;
            value = Math.trunc(value / parent.value);
            if (remaining > 0) {
              unitsToReturn.push({
                ...currentUnit,
                value: remaining,
              });
            }
          }
        } else {
          unitsToReturn.push({
            ...currentUnit,
            value: value,
          });
          parent = null;
        }
      } else {
        if (value !== 0 && value >= currentUnit?.value) {
          unitsToReturn.push({
            ...currentUnit,
            value: value,
          });
        }
      }

      currentUnit = parent;
    }

    return unitsToReturn;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
}
