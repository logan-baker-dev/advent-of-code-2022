import { loadData } from "../helper.js";

const elfCalories = loadData('01')
  .map(calorie => +calorie);

let maxCalories = 0;
let currTotal = 0;

for (const calories of elfCalories) {
  if (calories === 0) { // 0 signifies the start of a new elf pack.
    maxCalories = Math.max(currTotal, maxCalories);
    currTotal = 0;
  }

  currTotal += calories;
}

maxCalories = Math.max(currTotal, maxCalories); // Finish comparing the last elf pack.

console.log(maxCalories);