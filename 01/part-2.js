import { loadData } from "../helper.js";

const elfCalories = loadData('01')
  .map(calorie => +calorie);

const elfCalorieTotals = [];
let currTotal = 0;

for (const calories of elfCalories) {
  if (calories === 0) { // 0 signifies the start of a new elf pack.
    elfCalorieTotals.push(currTotal);
    currTotal = 0;
  }

  currTotal += calories;
}

if (currTotal > 0) { // Finish processing the last elf pack.
  elfCalorieTotals.push(currTotal);
}

elfCalorieTotals.sort((a, b) => b - a); // Sort totals into descending order.

const calorieSum = elfCalorieTotals.slice(0, 3)
  .reduce((prev, curr) => prev + curr, 0);

console.log(calorieSum);