var container = document.getElementById("chessboard");

const BLACK_PIECES = [
  "black-pawn",
  "black-knight",
  "black-bishop",
  "black-rook",
  "black-queen",
  "black-king",
];

const WHITE_PIECES = [
  "white-pawn",
  "white-knight",
  "white-bishop",
  "white-rook",
  "white-queen",
  "white-king",
];
var pieceSelected = true;
// gets a position e.g e2 and returns the coordinates in an array.
const positionToGrid = (position) => {
    const col = position.charCodeAt(0) - 97;
    const row = position.charAt(1)-1;
    return [col, row];
}

const gridToPosition = ([x, y]) => {
  const col = String.fromCharCode(x + 97);
  return col + y
}
//create an empty board
// empty strings represent no piece 
const CHESS_BOARD = [...Array(8)].map(x => [0,0,0,0,0,0,0,0]);

const positionToArray = (position) => {

}

/**
 * Generate starting board position
 */
function newGame() {

  var piece;
  for (var i = 0; i < 64; i++) {
    var square = document.createElement("div");
    square.classList.add("square");
    var row = Math.floor(i / 8);
    var col = i % 8;

    var letter = String.fromCharCode(97 + col);
    var number = 8 - row;
    var position = letter + number;
    
    square.classList.add("square-" + position);
    row = 7 - row;
    // fill in starting positions
    if (number === 7) {
      piece = "black-pawn";
      square.classList.add("piece", piece);
      CHESS_BOARD[row][col] = "black-pawn";
    } else if (number === 2) {
      piece = "white-pawn";
      square.classList.add("piece", piece);
      CHESS_BOARD[row][col] = "white-pawn";
      
    } else if (position === "b1" || position === "g1") {
      piece = "white-knight";
      square.classList.add("piece", "white-knight");
      CHESS_BOARD[row][col] = "white-knight";

    } else if (position === "c1" || position === "f1") {
      piece = "white-pawn";
      square.classList.add("piece", "white-bishop");
      CHESS_BOARD[row][col] = "white-bishop";

    } else if (position === "d1") {
      piece = "white-pawn";
      square.classList.add("piece", "white-queen");
      CHESS_BOARD[row][col] = "white-queen";

    } else if (position === "e1") {
      piece = "white-pawn";
      square.classList.add("piece", "white-king");
      CHESS_BOARD[row][col] = "white-king";

    } else if (position === "a1" || position === "h1") {
      piece = "white-pawn";
      square.classList.add("piece", "white-rook");
      CHESS_BOARD[row][col] = "white-rook";

    } else if (position === "b8" || position === "g8") {
      piece = "black-pawn";
      square.classList.add("piece", "black-knight");
      CHESS_BOARD[row][col] = "black-knight";
    } else if (position === "c8" || position === "f8") {
      piece = "black-pawn";
      square.classList.add("piece", "black-bishop");
      CHESS_BOARD[row][col] = "black-bishop";
    } else if (position === "d8") {
      piece = "black-pawn";
      square.classList.add("piece", "black-queen");
      CHESS_BOARD[row][col] = "black-queen";
    } else if (position === "e8") {
      piece = "black-king";
      square.classList.add("piece", "black-king");
      CHESS_BOARD[row][col] = "black-king";
    } else if (position === "a8" || position === "h8") {
      piece = "black-rook";
      square.classList.add("piece", "black-rook");
      CHESS_BOARD[row][col] = "black-rook";
    }
    container.appendChild(square);
  }

}
// Gets the div number counting from the top left
function positionToDiv(position) {
  var file = position[0];
  var rank = position[1];
  return file - file.charCodeAt(0) + rank * 8;
}
function startGame() {
  var whiteTurn = true;
  var childDivs = document
    .getElementById("chessboard")
    .getElementsByTagName("div");

  // get valid pieces to move
  var pieces = whiteTurn ? WHITE_PIECES : BLACK_PIECES;
  var validPiecesToMove = [];
  for (i = 0; i < childDivs.length; i++) {
    var classList = childDivs[i].className.split(/\s+/);
    if (classList.includes("piece")) {
      for (let j = 0; j <= classList.length; j++) {
        if (pieces.includes(classList[j])) {
          childDivs[i].setAttribute("draggable", true);
          validPiecesToMove.push(childDivs[i]);
          break;
        }
      }
    }
  }
  console.log("validPiecesToMove: ", validPiecesToMove);

  // Add event listeners for drag and drop
  validPiecesToMove.forEach(function (validPieces) {
    validPieces.addEventListener("dragstart", dragStart);
    validPieces.addEventListener("dragend", dragEnd);
    validPieces.addEventListener("click", onClick);
  });

  // Define the dragStart function
  function dragStart(event) {
    var [piece, position] = identifyPiece(event.target);
    // var validSquares = getValidSquares(piece, position);
    // console.log(validSquares);
  }

  // Define the dragEnd function
  function dragEnd(event) {
    // Remove any styles added during dragging
    event.target.style.opacity = "";
    console.log(event)
  }

  const deselect = (event) => {

    var [piece, position] = identifyPiece(event.target);
    var validSquares = getValidSquares(piece, position);

    validSquares.forEach((square)=> {
      validSquareElement = document.getElementsByClassName(`square-${gridToPosition(square)}`)[0];
      console.log(validSquareElement)
      validSquareElement.classList.remove("moveable");
    });
    event.target.addEventListener("click", onClick);
    event.target.removeEventListener("click", deselect)
  }
  // Define the dragEnd function
  function onClick(event) {
    // Remove any styles added during dragging
    var [piece, position] = identifyPiece(event.target);
    var validSquares = getValidSquares(piece, position);
    var validSquareElement;
    validSquares.forEach((square)=> {
      validSquareElement = document.getElementsByClassName(`square-${gridToPosition(square)}`)[0];
      console.log(validSquareElement)
      validSquareElement.classList.add("moveable");
    })
    event.target.removeEventListener("click", onClick);
    event.target.addEventListener("click", deselect)
    
    
    
    console.log(event)
  }
}

// return the piece that is being dragged and its position
function identifyPiece(div) {
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
  return (x >= 0 && x <= 7 && y >= 0 && y <= 7);
}
//return array of knight moves based on initial position
const knightMoves = (row, col, colour, board) => {
  console.log(board)
  var moves = [];
  const movement = [[-2, -1],[-2, 1],[-1, -2],[-1, 2],[1, -2],[1, 2],[2, -1],[2, 1]];
  var square;
  movement.forEach((it) => {
    square = [parseFloat(row) + parseFloat(it[0]), parseFloat(col) + parseFloat(it[1])];

    if (onTheBoard(square[0], square[1])) {
      if (board[square[0]][square[1]] === 0 || !board[square[0]][square[1]].includes(colour)) {

        console.log(square[0], square[1]) 
        // then this is not owned by the current player and is a valid square to move to
        moves.push([square[0], square[1]]);
      }
    }
  });
  return moves;

}
  
  

//return array of knight moves based on initial position
const pawnMoves = (col, row, colour, board) => {
  const direction = (colour === "white") ? 1 : -1;
  var moves = [[col, parseFloat(row)+parseFloat(direction)]];

  // first move can be 2 squares
  if (row ===1 || row === 6) {
    moves.push([col, row+2*direction]);
  }

  // taking pieces with a pawn
  // an opponents piece must exist for the pawn to be able to move diagonally
  if (onTheBoard(col-1, row+direction) && board[col-1][row+direction] !== 0 && !board[col-1][row+direction].includes(colour)) {
    moves.push([col-1][row+direction]);
  } else if (onTheBoard(col+1, row+direction) && board[col+1][row+direction] !== 0 && !board[col+1][row+direction].includes(colour)) {
    moves.push([col+1][row+direction]);
  }
  return moves;
}
//return array of knight moves based on initial position
const bishopMoves = (col, row, colour, board) => {
  // need to check diagonal moves in all directions
  var moves = [];
  
  var directions = [[-1, 1], [1, 1], [-1, -1], [1, -1]];

  for (let i=0; i<4; i++) {
    // check for pieces in each direction.
    let [x,y] = [col + directions[i][0], row + directions[i][1]];

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
      [x,y] = [x+ directions[i][0],y + directions[i][1]];

    }
  }

  return moves;
}
const rookMoves = (col, row, colour, board) => {
  var moves = [];
  var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let i=0; i<4; i++) {
    // check for pieces in each direction.
    let [x,y] = [col + directions[i][0], row + directions[i][1]];

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
      [x,y] = [x+ directions[i][0],y + directions[i][1]];

    }
  }
  return moves;

}

const queenMoves = (col, row, colour, board) => {
  var moves = [];
  var directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, 1], [-1, -1], [1, -1]];
  for (let i=0; i<directions.length; i++) {
    // check for pieces in each direction.
    let [x,y] = [col + directions[i][0], row + directions[i][1]];

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
      [x,y] = [x+ directions[i][0],y + directions[i][1]];

    }
  }
  return moves;
}
const kingMoves = (col, row, colour, board) => {
  var moves = [];
  var directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, 1], [-1, -1], [1, -1]];
  directions.forEach(dir => {
    let [x,y] = [col + dir[0], row + dir[1]];

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
}

function getValidSquares(piece, position) {
  console.log(piece, position);
  const [row, col] = positionToGrid(position);
  const colour = piece.includes("white") ? "white" : "black";
  switch (piece.split("-")[1]) {
    case 'pawn':
      return pawnMoves(col, row, colour, CHESS_BOARD)
    case 'knight':
      return knightMoves(col, row, colour, CHESS_BOARD)
    case 'bishop':
      return bishopMoves(col, row, colour, CHESS_BOARD)
    case 'rook':
      return rookMoves(col, row, colour, CHESS_BOARD)
    case 'queen':
      return queenMoves(col, row, colour, CHESS_BOARD)
    case 'king':
      return kingMoves(col, row, colour, CHESS_BOARD)
  }
  
}

// Setup new Game
newGame();

startGame();
