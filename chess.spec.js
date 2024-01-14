import { expect } from "chai";
var assert = import("assert");

import {
  getValidSquares,
  positionToGrid,
  gridToPosition,
  onTheBoard,
  pawnMoves,
  knightMoves,
  bishopMoves,
  queenMoves,
  kingMoves,
  rookMoves,
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
      expect(validMoves).to.deep.equal([
        [2, 6],
        [3, 6],
      ]);
    });
    describe("should return correct moves for an unmoved white h pawn", () => {
      const validMoves = pawnMoves(1, 8, "white", DEFAULT_CHESS_BOARD);
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
      expect(validMoves).to.deep.equal([
        [5, 6],
        [4, 6],
      ]);
    });
    describe("should return correct moves for an unmoved black h pawn", () => {
      const validMoves = pawnMoves(6, 7, "black", DEFAULT_CHESS_BOARD);
      expect(validMoves).to.deep.equal([
        [5, 7],
        [4, 7],
      ]);
    });

    describe("should allow a white piece to take opponent pieces", () => {
      const customBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, "white-pawn", 0, 0, 0, 0, 0, 0],
        ["black-knight", 0, "black-queen", 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];
      const validMoves = pawnMoves(2, 1, "white", customBoard);
      expect(validMoves).to.deep.equal([
        [3, 1],
        [3, 0],
        [3, 2],
      ]);
    });
    describe("should allow a black piece to take opponent pieces", () => {
      const customBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, "white-pawn", 0, 0, 0],
        ["black-knight", 0, 0, 0, 0, "black-pawn", 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];
      const validMoves = pawnMoves(3, 5, "black", customBoard);
      expect(validMoves).to.deep.equal([
        [2, 5],
        [2, 4],
      ]);
    });
  });

  describe("the knight", () => {
    describe("moves from the starting position", () => {
      it("white b knight", () => {
        const validMoves = knightMoves(0, 1, "white", DEFAULT_CHESS_BOARD);
        expect(validMoves).to.deep.equal([
          [2, 0],
          [2, 2],
        ]);
      });
      it("black f knight", () => {
        const validMoves = knightMoves(7, 6, "black", DEFAULT_CHESS_BOARD);
        expect(validMoves).to.deep.equal([
          [5, 5],
          [5, 7],
        ]);
      });
    });
    describe("other moves", () => {
      it("white knight from c4", () => {
        const customBoard = [
          [0, 0, 0, 0, 0, 0, 0, 0],
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
          ["black-knight", 0, "white-knight", 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const validMoves = knightMoves(3, 2, "white", customBoard);
        expect(validMoves).to.deep.equal([
          [2, 0],
          [2, 4],
          [4, 0],
          [4, 4],
          [5, 1],
          [5, 3],
        ]);
      });
      it("black f knight", () => {
        const customBoard = [
          [0, 0, 0, 0, 0, 0, 0, 0],
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
          ["black-queen", 0, , 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, "black-knight", 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [
            "black-pawn",
            "black-pawn",
            "black-pawn",
            "black-pawn",
            "black-pawn",
            "black-pawn",
            0,
            "black-pawn",
          ],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const validMoves = knightMoves(4, 5, "black", customBoard);
        expect(validMoves).to.deep.equal([
          [2, 4],
          [2, 6],
          [3, 3],
          [3, 7],
          [5, 3],
          [5, 7],
          [6, 6],
        ]);
      });
    });
  });
  describe("the bishop", () => {
    describe("moves from the starting position", () => {
      it("white b bishop", () => {
        const validMoves = bishopMoves(0, 2, "white", DEFAULT_CHESS_BOARD);
        expect(validMoves).to.deep.equal([]);
      });
      it("black f bishop", () => {
        const validMoves = bishopMoves(7, 5, "black", DEFAULT_CHESS_BOARD);
        expect(validMoves).to.deep.equal([]);
      });
    });
    describe("other moves", () => {
      it("white bishop from c4", () => {
        const customBoard = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [
            "white-pawn",
            "white-pawn",
            "white-pawn",
            "white-pawn",
            0,
            "white-pawn",
            "white-pawn",
            "white-pawn",
          ],
          ["black-knight", 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, "white-bishop", 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          ["white-knight", 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, "white-queen"],
        ];
        const validMoves = bishopMoves(3, 2, "white", customBoard);
        expect(validMoves).to.have.deep.members([
          [0, 5],
          [1, 4],
          [2, 3],
          [2, 1],
          [4, 1],
          [4, 3],
          [5, 4],
          [6, 5],
          [7, 6],
        ]);
      });
      it("black bishop on f5", () => {
        const customBoard = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, "black-bishop", 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [
            "black-pawn",
            "black-pawn",
            "black-pawn",
            "black-pawn",
            "black-pawn",
            "black-pawn",
            0,
            "black-pawn",
          ],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const validMoves = bishopMoves(4, 5, "black", customBoard);
        expect(validMoves).to.have.deep.members([
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [2, 7],
          [3, 6],
          [5, 6],
          [5, 4],
        ]);
      });
    });
  });
});
