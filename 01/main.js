import DAY, { loadData } from "../helper.js";

const getMaxCalorieCount = (day) => {
  const calorieCounts = loadData(day)
    .map(calories => +calories);

  let maxCalorieCount = 0;
  let currCaloricTotal = 0;

  for (const calorieCount of calorieCounts) {
    if (calorieCount === 0) { // 0 signifies the start of a new elf pack.
      maxCalorieCount = Math.max(maxCalorieCount, currCaloricTotal);
      currCaloricTotal = 0;

      continue;
    }

    currCaloricTotal += calorieCount;
  }

  return Math.max(currCaloricTotal, maxCalorieCount);
}

const getTopThreeMaxCalorieCounts = (day) => {
  const calorieCounts = loadData(day)
    .map(calories => +calories); // Convert number strings to numbers.

  const caloricTotals = [];
  let currCaloricTotal = 0;

  for (const calorieCount of calorieCounts) {
    if (calorieCount === 0) { // 0 signifies the start of a new elf pack.
      caloricTotals.push(currCaloricTotal);
      currCaloricTotal = 0;

      continue;
    }

    currCaloricTotal += calorieCount;
  }

  if (currCaloricTotal > 0) { // Finish processing the last elf pack.
    caloricTotals.push(currCaloricTotal);
  }

  return caloricTotals
    .sort((a, b) => b - a) // Sort caloric totals into descending order.
    .slice(0, 3) // Take top 3 totals.
    .reduce((prev, curr) => prev + curr, 0); // Sum the totals.
}

console.log(getMaxCalorieCount(DAY.one));
console.log(getTopThreeMaxCalorieCounts(DAY.one));