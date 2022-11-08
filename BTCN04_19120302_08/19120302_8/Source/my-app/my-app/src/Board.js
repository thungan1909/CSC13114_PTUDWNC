import React from 'react';
import './index.css';
import Square from './Square';

function renderSquare(i, winnerCells, squares, onClick) {
  let extraClassName = 'square';
  if (winnerCells && winnerCells.i > -1 )
    extraClassName = 'square highlighted';

  return (<Square
            key = {'sq_'+i}
            check = {winnerCells}
            extraClass = {extraClassName}
            value = {squares[i]}
            onClick = { () => onClick(i) }
          />);
}

function renderBoard(squares, winnerCells, onClick) {
  const allSquares = []
  for (var row_n = 0; row_n < 3; row_n++) {
    let rowSquares = []
    for (var col_n = 0; col_n < 3; col_n++) {
      rowSquares.push(renderSquare(row_n*3+col_n, winnerCells, squares, onClick) );
    }
    allSquares.push(<div key={'row_'+row_n} className="board-row">{rowSquares}</div>);
  }

  return allSquares;
}

function Board(squares, winnerCells, onClick) {
  return (<div> {renderBoard(squares, winnerCells, onClick)} </div>);
}





  export default Board;