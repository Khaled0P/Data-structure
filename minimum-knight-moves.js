const minimumKnightMoves = function (
  startingX,
  startingY,
  targetRow,
  targetCol
) {
  let dir = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  let visited = new Set();
  let queue = [[startingX, startingY]];
  let steps = 0;
  //   let path = [];

  while (queue.length) {
    let next = [];
    while (queue.length) {
      let current = queue.shift();
      let currentX = current[0];
      let currentY = current[1];
      if (currentX === targetRow && currentY === targetCol) return next;

      for (d of dir) {
        let nextX = currentX + d[0];
        let nextY = currentY + d[1];
        //don't go off the chess board
        if (nextX < 0 || nextX > 8 || nextY < 0 || nextY > 8) continue;
        if (!visited.has(nextX + ',' + nextY)) {
          visited.add(nextX + ',' + nextY);
          next.push([nextX, nextY]);
        }
      }
    }
    steps++;
    queue = next;
  }
};

console.log(minimumKnightMoves(1, 2, 3, 3));
