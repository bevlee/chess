import {
  getValidSquares,
  identifyPiece,
  gridToPosition,
  positionToGrid,
} from "./chess.js";

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

var pieceSelected = false;

//create an empty board
// zeros represent no piece
const CHESS_BOARD = [...Array(8)].map((x) => [0, 0, 0, 0, 0, 0, 0, 0]);

const positionToArray = (position) => {};

/**
 * Generate starting board position
 */
function newGame() {
  var piece;
  // populate the initial board
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
  for (var i = 0; i < childDivs.length; i++) {
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
    console.log(event);
  }

  const deselect = (event) => {
    var [piece, position] = identifyPiece(event.target);
    var validSquares = getValidSquares(piece, position);

    validSquares.forEach((square) => {
      validSquareElement = document.getElementsByClassName(
        `square-${gridToPosition(square)}`
      )[0];
      validSquareElement.classList.remove("moveable");
    });
    event.target.addEventListener("click", onClick);
    event.target.removeEventListener("click", deselect);
  };

  // Define the dragEnd function
  function onClick(event) {
    // Remove any styles added during dragging
    var [piece, position] = identifyPiece(event.target);
    var validSquares = getValidSquares(piece, position);
    console.log(validSquares);
    var validSquareElement;
    validSquares.forEach((square) => {
      validSquareElement = document.getElementsByClassName(
        `square-${gridToPosition(square)}`
      )[0];
      console.log(validSquareElement);
      validSquareElement.classList.add("moveable");
    });

    event.target.removeEventListener("click", onClick);
    event.target.addEventListener("click", deselect);

    pieceSelected = gridToPosition([piece, position]);
    console.log("pieceSelected is " + pieceSelected);
  }
}

// Setup new Game
newGame();

startGame();
