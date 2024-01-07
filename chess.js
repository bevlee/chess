const BLACK_PIECES = [
  "black-pawn",
  "black-knight",
  "black-bishop",
  "black-rook",
  "black-queen",
  "black-king",
];
const CHESS_BOARD = [...Array(8)].map((x) => [0, 0, 0, 0, 0, 0, 0, 0]);

const WHITE_PIECES = [
  "white-pawn",
  "white-knight",
  "white-bishop",
  "white-rook",
  "white-queen",
  "white-king",
];

// return the piece that is being dragged and its position
export function identifyPiece(div) {
  // const PIECES = ["pawn", "knight", "bishop", "rook", "queen", "king"];
  const PIECES = [...WHITE_PIECES, ...BLACK_PIECES];
  var classList = div.className.split(/\s+/);
  var position = classList[1].split("-")[1];
  let piece;

  for (let p of PIECES) {
    if (classList.includes(p)) {
      piece = p;
    }
  }

  return [piece, position];
}

const onTheBoard = (x, y) => {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
};

//return array of knight moves based on initial position
export const knightMoves = (row, col, colour, board) => {
  console.log(board);
  var moves = [];
  const movement = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  var square;
  movement.forEach((it) => {
    square = [
      parseFloat(row) + parseFloat(it[0]),
      parseFloat(col) + parseFloat(it[1]),
    ];

    if (onTheBoard(square[0], square[1])) {
      if (
        board[square[0]][square[1]] === 0 ||
        !board[square[0]][square[1]].includes(colour)
      ) {
        console.log(square[0], square[1]);
        // then this is not owned by the current player and is a valid square to move to
        moves.push([square[0], square[1]]);
      }
    }
  });
  return moves;
};

//return array of knight moves based on initial position
export const pawnMoves = (col, row, colour, board) => {
  const direction = colour === "white" ? 1 : -1;
  var moves = [[col, parseFloat(row) + parseFloat(direction)]];

  // first move can be 2 squares
  if (row == 1 || row == 6) {
    moves.push([col, row + 2 * direction]);
  }
  console.log("1st logix" + moves);
  // taking pieces with a pawn
  // an opponents piece must exist for the pawn to be able to move diagonally
  if (
    onTheBoard(col - 1, row + direction) &&
    board[col - 1][row + direction] !== 0 &&
    !board[col - 1][row + direction].includes(colour)
  ) {
    moves.push([col - 1][row + direction]);
  } else if (
    onTheBoard(col + 1, row + direction) &&
    board[col + 1][row + direction] !== 0 &&
    !board[col + 1][row + direction].includes(colour)
  ) {
    moves.push([col + 1][row + direction]);
  }
  console.log("2st logix" + moves);
  return moves;
};

//return array of knight moves based on initial position
export const bishopMoves = (col, row, colour, board) => {
  // need to check diagonal moves in all directions
  var moves = [];

  var directions = [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ];

  for (let i = 0; i < 4; i++) {
    // check for pieces in each direction.
    let [x, y] = [col + directions[i][0], row + directions[i][1]];

    // the square must be on the board
    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      // valid move if the square is empty
      if (board[x][y] === 0) {
        moves.push([x, y]);
      } else if (board[x][y].includes(colour)) {
        // if its the same colour as the selected piece, then the bishop cannot move there
        break;
      } else {
        // then there is a poiece belonging to the opponeng so the bishop can move there
        moves.push([x, y]);
        break;
      }
      // cehck the next position in that direction
      [x, y] = [x + directions[i][0], y + directions[i][1]];
    }
  }

  return moves;
};

export const rookMoves = (col, row, colour, board) => {
  var moves = [];
  var directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (let i = 0; i < 4; i++) {
    // check for pieces in each direction.
    let [x, y] = [col + directions[i][0], row + directions[i][1]];

    // the square must be on the board
    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      // valid move if the square is empty
      if (board[x][y] === 0) {
        moves.push([x, y]);
      } else if (board[x][y].includes(colour)) {
        // if its the same colour as the selected piece, then the rook cannot move there
        break;
      } else {
        // then there is a poiece belonging to the opponeng so the rook can move there
        moves.push([x, y]);
        break;
      }
      // cehck the next position in that direction
      [x, y] = [x + directions[i][0], y + directions[i][1]];
    }
  }
  return moves;
};

export const queenMoves = (col, row, colour, board) => {
  var moves = [];
  var directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ];
  for (let i = 0; i < directions.length; i++) {
    // check for pieces in each direction.
    let [x, y] = [col + directions[i][0], row + directions[i][1]];

    // the square must be on the board
    while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      // valid move if the square is empty
      if (board[x][y] === 0) {
        moves.push([x, y]);
      } else if (board[x][y].includes(colour)) {
        // if its the same colour as the selected piece, then the rook cannot move there
        break;
      } else {
        // then there is a poiece belonging to the opponeng so the rook can move there
        moves.push([x, y]);
        break;
      }
      // cehck the next position in that direction
      [x, y] = [x + directions[i][0], y + directions[i][1]];
    }
  }
  return moves;
};
export const kingMoves = (col, row, colour, board) => {
  var moves = [];
  var directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ];
  directions.forEach((dir) => {
    let [x, y] = [col + dir[0], row + dir[1]];

    // the square must be on the board
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
      // valid move if the square is empty
      if (board[x][y] === 0) {
        moves.push([x, y]);
      } else if (board[x][y].includes(colour)) {
        // if its the same colour as the selected piece, then the rook cannot move there
      } else {
        // then there is a poiece belonging to the opponeng so the rook can move there
        moves.push([x, y]);
      }
    }
  });
  return moves;
};

export function getValidSquares(piece, position) {
  console.log(piece, position);
  const [col, row] = positionToGrid(position);
  const colour = piece.includes("white") ? "white" : "black";
  switch (piece.split("-")[1]) {
    case "pawn":
      return pawnMoves(col, row, colour, CHESS_BOARD);
    case "knight":
      return knightMoves(col, row, colour, CHESS_BOARD);
    case "bishop":
      return bishopMoves(col, row, colour, CHESS_BOARD);
    case "rook":
      return rookMoves(col, row, colour, CHESS_BOARD);
    case "queen":
      return queenMoves(col, row, colour, CHESS_BOARD);
    case "king":
      return kingMoves(col, row, colour, CHESS_BOARD);
  }
}
// gets a position e.g e2 and returns the coordinates in an array.
export const positionToGrid = (position) => {
  const col = position.charCodeAt(0) - 97;
  const row = position.charAt(1) - 1;
  return [col, row];
};

//turns grid coords to a chess position ie. e4, c8
export const gridToPosition = ([x, y]) => {
  const col = String.fromCharCode(x + 97);
  console.log("return is " + col + (y + 1));
  return col + (y + 1);
};
