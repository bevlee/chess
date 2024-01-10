import { expect } from "chai";
var assert = import("assert");

import { getValidSquares, pawnMoves } from "./chess.js";

const DEFAULT_CHESS_BOARD = [
  [
    "white-rook",
    "white-knight",
    "white-bishop",
    "white-queen",
    "white-king",
    "white-bishop",
    "white-knight",
    "white-rook",
  ],
  [
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
  ],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [
    "black-rook",
    "black-knight",
    "black-bishop",
    "black-queen",
    "black-king",
    "black-bishop",
    "black-knight",
    "black-rook",
  ],
  [
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
  ],
];

describe("valid pieces moving", () => {
  describe("pawn moving", () => {
    describe("should return correct moves for an unmoved white a pawn", () => {
      const validMoves = pawnMoves(1, 0, "white", DEFAULT_CHESS_BOARD);

      expect(validMoves).to.deep.equal([
        [1, 2],
        [1, 3],
      ]);
    });

    describe("should return correct moves for an unmoved white f pawn", () => {
      const validMoves = pawnMoves(0, 7, "white", DEFAULT_CHESS_BOARD);
      console.log(validMoves);
      expect(validMoves).to.deep.equal([
        [8, 2],
        [8, 3],
      ]);
    });
  });
});
