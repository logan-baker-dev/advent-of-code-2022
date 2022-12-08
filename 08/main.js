import DAY, { loadData } from "../helper.js";

const countVisibleTreesFromOutside = (day) => {
  const isPerimeterTree = (row, col) => {
    return (row === 0 || row === grid.length - 1)
      && (col === 0 || col === grid[0].length - 1);
  }

  const isTreeVisible = (row, col) => {
    if (isPerimeterTree(row, col)) return true;

    const originHeight = grid[row][col];

    const isVisibleFrom = {
      north: true,
      south: true,
      west: true,
      east: true
    };

    for (let newRow = row - 1; newRow >= 0; --newRow) { // Check for taller trees to the north.
      if (grid[newRow][col] >= originHeight) {
        isVisibleFrom.north = false;
        break;
      }
    }

    for (let newRow = row + 1; newRow < grid.length; ++newRow) { // Check for taller trees to the south.
      if (grid[newRow][col] >= originHeight) {
        isVisibleFrom.south = false;
        break;
      }
    }

    for (let newCol = col - 1; newCol >= 0; --newCol) { // Check for taller trees to the west.
      if (grid[row][newCol] >= originHeight) {
        isVisibleFrom.west = false;
        break;
      }
    }

    for (let newCol = col + 1; newCol < grid[0].length; ++newCol) { // Check for taller trees to the east.
      if (grid[row][newCol] >= originHeight) {
        isVisibleFrom.east = false;
        break;
      }
    }

    for (const direction in isVisibleFrom) {
      if (isVisibleFrom[direction]) return true;
    }

    return false;
  }

  const grid = loadData(day)
    .map(row => row.split('').map(letter => +letter));

  let visibleTreeCount = 0;

  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[0].length; ++col) {
      if (isTreeVisible(row, col)) {
        ++visibleTreeCount
      }
    }
  }

  return visibleTreeCount;
}

const calculateHighestScenicScore = (day) => {
  const calculateScenicScore = (row, col) => {
    const originHeight = grid[row][col];

    const viewDistanceFrom = {
      north: 0,
      south: 0,
      west: 0,
      east: 0
    };

    for (let newRow = row - 1; newRow >= 0; --newRow) { // Check for taller trees to the north.
      ++viewDistanceFrom.north;

      if (grid[newRow][col] >= originHeight) break;
    }

    for (let newRow = row + 1; newRow < grid.length; ++newRow) { // Check for taller trees to the south.
      ++viewDistanceFrom.south;

      if (grid[newRow][col] >= originHeight) break;
    }

    for (let newCol = col - 1; newCol >= 0; --newCol) { // Check for taller trees to the west.
      ++viewDistanceFrom.west;

      if (grid[row][newCol] >= originHeight) break;
    }

    for (let newCol = col + 1; newCol < grid[0].length; ++newCol) { // Check for taller trees to the east.
      ++viewDistanceFrom.east;

      if (grid[row][newCol] >= originHeight) break;
    }

    let scenicScore = 1;

    for (const direction in viewDistanceFrom) {
      scenicScore *= viewDistanceFrom[direction];
    }

    return scenicScore;
  }

  const grid = loadData(day)
    .map(row => row.split('').map(letter => +letter));

  let maxScenicScore = 1;

  for (let row = 0; row < grid.length; ++row) {
    for (let col = 0; col < grid[0].length; ++col) {
      const scenicScore = calculateScenicScore(row, col);

      maxScenicScore = Math.max(maxScenicScore, scenicScore);
    }
  }

  return maxScenicScore;
}


console.log(countVisibleTreesFromOutside(DAY.eight));
console.log(calculateHighestScenicScore(DAY.eight));