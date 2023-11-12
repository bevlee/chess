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

/**
 * Generate starting board position
 */
function newGame() {
  for (var i = 0; i < 64; i++) {
    var square = document.createElement("div");
    square.classList.add("square");
    var row = Math.floor(i / 8);
    var col = i % 8;

    var letter = String.fromCharCode(97 + col);
    var number = 8 - row;
    var position = letter + number;
    square.classList.add("square-" + position);

    if (number == 7) {
      square.classList.add("piece", "black-pawn");
    } else if (number == 2) {
      square.classList.add("piece", "white-pawn");
    } else if (position == "b1" || position == "g1") {
      square.classList.add("piece", "white-knight");
    } else if (position == "c1" || position == "f1") {
      square.classList.add("piece", "white-bishop");
    } else if (position == "d1") {
      square.classList.add("piece", "white-queen");
    } else if (position == "e1") {
      square.classList.add("piece", "white-king");
    } else if (position == "a1" || position == "h1") {
      square.classList.add("piece", "white-rook");
    } else if (position == "b8" || position == "g8") {
      square.classList.add("piece", "black-knight");
    } else if (position == "c8" || position == "f8") {
      square.classList.add("piece", "black-bishop");
    } else if (position == "d8") {
      square.classList.add("piece", "black-queen");
    } else if (position == "e8") {
      square.classList.add("piece", "black-king");
    } else if (position == "a8" || position == "h8") {
      square.classList.add("piece", "black-rook");
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
  console.log(validPiecesToMove);

  // Add event listeners for drag and drop
  validPiecesToMove.forEach(function (validPieces) {
    validPieces.addEventListener("dragstart", dragStart);
    validPieces.addEventListener("dragend", dragEnd);
  });

  // Define the dragStart function
  function dragStart(event) {
    console.log("dragigng");
    var [piece, position] = identifyPiece(event.target);
    var validSquares = getValidSquares(piece, position);
  }

  // Define the dragEnd function
  function dragEnd(event) {
    // Remove any styles added during dragging
    event.target.style.opacity = "";
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

function getValidSquares(piece, position) {
  console.log(piece, position);
}

// Setup new Game
newGame();

startGame();
console.log("started");
