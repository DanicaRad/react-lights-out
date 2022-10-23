import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 1.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for( let i = 0; i < nrows; i++) {
      let row = [];
      for( let i = 0; i < ncols; i++) {
        row.push([true, false][Math.floor(Math.random() * chanceLightStartsOn)])
      }
      initialBoard.push(row);
    }
    console.log(initialBoard)
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    console.log("has won", board.every(row => row.every(col => col)))
    return board.every(row => row.every(col => !col));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const oldBoardCopy = oldBoard.map(row => [...row]);
      flipCell(y, x, oldBoardCopy);
      flipCell(y, x - 1, oldBoardCopy);
      flipCell(y, x + 1, oldBoardCopy);
      flipCell(y - 1, x, oldBoardCopy);
      flipCell(y + 1, x, oldBoardCopy);
      
      return oldBoardCopy;

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }
  
  // TODO: if the game is won, just show a winning msg & render nothing else
  if(!hasWon) {
    return (<div>You win!</div>);
  }

  // TODO: make table board

  let tableBoard = [];

  for( let y = 0; y < nrows; y++ ) {
    let row = [];
    for (let x = 0; x < ncols; x++ ) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>)
  }
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  )
}

export default Board;
