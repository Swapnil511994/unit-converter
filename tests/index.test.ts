import { convert, convertRaw } from "../src/unit_converter";
import { Unit } from "../src/unit.interface";

describe("Unit Converter Tests", () => {
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

  // Test cases for convert function
  test("Convert 1101 litres to human-readable string", () => {
    const result = convert(units, 4, 1101);
    expect(result.trim()).toBe("2 Carton 7 Box 1 Litre");
  });

  test("Convert 551 litres to human-readable string", () => {
    const result = convert(units, 4, 551);
    expect(result.trim()).toBe("1 Carton 3 Box 5 Bottle 1 Litre");
  });

  test("Convert 44110001 litres to human-readable string", () => {
    const result = convert(units, 4, 44110001);
    expect(result.trim()).toBe("459 Container 95 Carton 20 Box 1 Litre");
  });

  // Test cases for convertRaw function
  test("Convert 1101 litres to raw units array", () => {
    const result = convertRaw(units, 4, 1101);
    expect(result).toEqual([
      {
        name: "Litre",
        isFractionable: false,
        parentUnitId: 3,
        unitId: 4,
        value: 1,
      },
      {
        name: "Box",
        isFractionable: false,
        parentUnitId: 1,
        unitId: 2,
        value: 7,
      },
      {
        name: "Carton",
        isFractionable: false,
        parentUnitId: 0,
        unitId: 1,
        value: 2,
      },
    ]);
  });

  // Edge cases
  test("Return 'Unable to convert unit' when no unit provided", () => {
    const callWithNoUnits = convert([], 4, 100);
    expect(callWithNoUnits.trim()).toBe("Unable to convert unit");
  });

  test("Return <Custom Message> in case of error and fallbackValue is provided", () => {
    const callWithNoUnits = convert([], 4, 100, "my Error Message");
    expect(callWithNoUnits.trim()).toBe("my Error Message");
  });

  test("Return 'Unable to convert unit' when invalid base unit provided", () => {
    const callWithInvalidId = convert(units, 99, 100);
    expect(callWithInvalidId).toBe("Unable to convert unit");
  });
});
