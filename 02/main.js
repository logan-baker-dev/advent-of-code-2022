import DAYS, { loadData } from '../helper.js';

const roundScores = new Map([
  ['win', 6],
  ['draw', 3],
  ['loss', 0],
]);

const roundResults = new Map([
  ['A', new Map([ // A is rock
    ['X', { score: 1, roundStatus: 'draw' }], // rock ties rock
    ['Y', { score: 2, roundStatus: 'win' }],  // paper beats rock
    ['Z', { score: 3, roundStatus: 'loss' }], // scissor loses to rock
  ])],
  ['B', new Map([ // B is paper
    ['X', { score: 1, roundStatus: 'loss' }], // paper beats rock
    ['Y', { score: 2, roundStatus: 'draw' }], // paper ties paper
    ['Z', { score: 3, roundStatus: 'win' }],  // paper loses to scissor
  ])],
  ['C', new Map([ // C is scissor
    ['X', { score: 1, roundStatus: 'win' }],  // rock bets scissor
    ['Y', { score: 2, roundStatus: 'loss' }], // paper loses to scissor
    ['Z', { score: 3, roundStatus: 'draw' }], // scissor ties scissor
  ])],
]);

const roundGoals = new Map([
  ['X', 'loss'],
  ['Y', 'draw'],
  ['Z', 'win']
]);

const calculateImpliedScore = (opponentChoice, myChoice) => {
  const possibleResults = roundResults.get(opponentChoice);

  const result = possibleResults.get(myChoice);

  return result.score + roundScores.get(result.roundStatus);
}

const getImpliedTotalScore = (day) => {
  const stategyGuide = loadData(day)
    .map(line => line.split(' '));

  let score = 0;

  for (const [opponentChoice, myChoice] of stategyGuide) {
    score += calculateImpliedScore(opponentChoice, myChoice);
  }

  return score;
}

const calculateActualScore = (opponentChoice, myChoice) => {
  const roundGoal = roundGoals.get(myChoice);
  const possibleResults = Array.from(roundResults.get(opponentChoice).values());

  // Grab the targeted result from the possible results.
  const targetResult = possibleResults.filter(roundResult => roundResult.roundStatus === roundGoal)[0];

  return targetResult.score + roundScores.get(roundGoal);
};

const getActualTotalScore = (day) => {
  const stategyGuide = loadData(day)
    .map(line => line.split(' '));

  let score = 0;
  for (const [opponentChoice, myChoice] of stategyGuide) {
    score += calculateActualScore(opponentChoice, myChoice);
  }

  return score;
}

console.log(getImpliedTotalScore(DAYS.two));
console.log(getActualTotalScore(DAYS.two));