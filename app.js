var container = document.getElementById("chessboard");

for (var i = 0; i < 64; i++) {
  var square = document.createElement("div");
  square.classList.add("square");
  var row = Math.floor(i / 8);
  var col = i % 8;

  // alternate colors for each row
  if (row % 2 == 0) {
    if (col % 2 == 0) {
      square.classList.add("square-white");
    } else {
      square.classList.add("square-black");
    }
  } else {
    if (col % 2 == 0) {
      square.classList.add("square-black");
    } else {
      square.classList.add("square-white");
    }
  }
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
