import DAYS, { loadData } from "../helper.js";

const getInterval = (assignment) => {
  return assignment.split('-')
    .map(interval => +interval);
}

const doesCompleteOverlapExist = (firstInterval, secondInterval) => {
  const [firstStart, firstEnd] = firstInterval;
  const [secondStart, secondEnd] = secondInterval;

  if (secondStart >= firstStart && secondEnd <= firstEnd) return true;
  if (firstStart >= secondStart && firstEnd <= secondEnd) return true;

  return false;
}

const doesAnyOverlapExist = (firstInterval, secondInterval) => {
  const [firstStart, firstEnd] = firstInterval;
  const [secondStart, secondEnd] = secondInterval;

  // First interval comes before second
  if (firstEnd < secondEnd) {
    return secondStart <= firstEnd;
  }
  else {
    return firstStart <= secondEnd;
  }
}

const getCompleteOverlappingAssigmentCount = (day) => {
  const sectionAssignments = loadData(day)
    .map(assignments => assignments.split(','))

  let sum = 0;

  for (const [firstAssignment, secondAssignment] of sectionAssignments) {
    const firstInterval = getInterval(firstAssignment);
    const secondInterval = getInterval(secondAssignment);

    if (doesCompleteOverlapExist(firstInterval, secondInterval)) {
      ++sum;
    }
  }

  return sum;
}

const getOverlappingAssigmentCount = (day) => {
  const sectionAssignments = loadData(day)
    .map(assignments => assignments.split(','))

  let sum = 0;

  for (const [firstAssignment, secondAssignment] of sectionAssignments) {
    const firstInterval = getInterval(firstAssignment);
    const secondInterval = getInterval(secondAssignment);

    if (doesAnyOverlapExist(firstInterval, secondInterval)) {
      ++sum;
    }
  }

  return sum;
}

console.log(getCompleteOverlappingAssigmentCount(DAYS.four));
console.log(getOverlappingAssigmentCount(DAYS.four));