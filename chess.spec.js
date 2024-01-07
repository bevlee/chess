const expect = import("chai").expect;
var assert = import("assert");

import { getValidSquares, pawnMoves } from "./chess.js";

describe("valid pieces moving", () => {
  describe("pawn moving", () => {
    it("should return corerect moves for an unmoved pawn", () => {
      const CHESS_BOARD = [...Array(8)].map((x) => [0, 0, 0, 0, 0, 0, 0, 0]);
      expect(pawnMoves(1, 1, "white", CHESS_BOARD).to.equal(1));
    });
  });
});
