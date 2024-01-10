import { expect } from "chai";
var assert = import("assert");

import {
  getValidSquares,
  positionToGrid,
  gridToPosition,
  onTheBoard,
  pawnMoves,
} from "./chess.js";

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
describe("check for valid board square", () => {
  it("returns true for valid squares", () => {
    expect(onTheBoard(0, 0)).to.equal(true);
    expect(onTheBoard(1, 0)).to.equal(true);
    expect(onTheBoard(7, 0)).to.equal(true);
    expect(onTheBoard(0, 1)).to.equal(true);
    expect(onTheBoard(0, 7)).to.equal(true);
    expect(onTheBoard(7, 7)).to.equal(true);
  });

  it("returns false for invalid squares", () => {
    expect(onTheBoard(-1, 0)).to.equal(false);
    expect(onTheBoard(0, -1)).to.equal(false);
    expect(onTheBoard(-1, -1)).to.equal(false);
    expect(onTheBoard(8, 1)).to.equal(false);
    expect(onTheBoard(8, 7)).to.equal(false);
    expect(onTheBoard(8, 8)).to.equal(false);
  });
});

describe("convert chess position into grid form", () => {
  it("returns the valid squares", () => {
    expect(positionToGrid("a1")).to.deep.equal([0, 0]);
    expect(positionToGrid("c2")).to.deep.equal([1, 2]);
    expect(positionToGrid("h4")).to.deep.equal([3, 7]);
    expect(positionToGrid("a8")).to.deep.equal([7, 0]);
    expect(positionToGrid("h8")).to.deep.equal([7, 7]);
    expect(positionToGrid("e5")).to.deep.equal([4, 4]);
  });
});

describe("convert chess position into grid form", () => {
  it("returns the valid squares", () => {
    expect(gridToPosition([0, 0])).to.equal("a1");
    expect(gridToPosition([1, 2])).to.equal("c2");
    expect(gridToPosition([3, 7])).to.equal("h4");
    expect(gridToPosition([7, 0])).to.equal("a8");
    expect(gridToPosition([7, 7])).to.equal("h8");
    expect(gridToPosition([4, 4])).to.equal("e5");
  });
});
describe("valid pieces moving", () => {
  describe("pawn moving", () => {
    describe("should return correct moves for an unmoved white a pawn", () => {
      const validMoves = pawnMoves(1, 0, "white", DEFAULT_CHESS_BOARD);
      expect(validMoves).to.deep.equal([
        [2, 0],
        [3, 0],
      ]);
    });
    describe("should return correct moves for an unmoved white f pawn", () => {
      const validMoves = pawnMoves(1, 6, "white", DEFAULT_CHESS_BOARD);
      console.log(validMoves);
      expect(validMoves).to.deep.equal([
        [2, 6],
        [3, 6],
      ]);
    });
    describe("should return correct moves for an unmoved white h pawn", () => {
      const validMoves = pawnMoves(1, 8, "white", DEFAULT_CHESS_BOARD);
      console.log(validMoves);
      expect(validMoves).to.deep.equal([
        [2, 8],
        [3, 8],
      ]);
    });

    describe("should return correct moves for an unmoved black a pawn", () => {
      const validMoves = pawnMoves(6, 0, "black", DEFAULT_CHESS_BOARD);
      expect(validMoves).to.deep.equal([
        [5, 0],
        [4, 0],
      ]);
    });
    describe("should return correct moves for an unmoved black f pawn", () => {
      const validMoves = pawnMoves(6, 6, "black", DEFAULT_CHESS_BOARD);
      console.log(validMoves);
      expect(validMoves).to.deep.equal([
        [5, 6],
        [4, 6],
      ]);
    });
    describe("should return correct moves for an unmoved black h pawn", () => {
      const validMoves = pawnMoves(6, 7, "black", DEFAULT_CHESS_BOARD);
      console.log(validMoves);
      expect(validMoves).to.deep.equal([
        [5, 7],
        [4, 7],
      ]);
    });
  });
});
