import React, {useState} from 'react';
import './index.css';
import calculateWinner from './calculateWinner.js';
import Board from './Board';

function Game () {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      picked: null,
    }
  ]);
  const [stepNumber, setStepNumber] = useState( 0);
  const [xIsNext, setXIsNext] = useState( true);
  const [movesAsc, setMovesAsc] = useState(true);

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  function toggleOrder() {
    setMovesAsc(!movesAsc);
  }

  function handleClick(i) {
    const currenthistory = history.slice(0, stepNumber + 1);
    const current = currenthistory[currenthistory.length - 1];
    const squares = current.squares.slice();
    if(squares[i] || calculateWinner(squares))
      return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(currenthistory.concat([{squares: squares, picked: i}]));
    setStepNumber(currenthistory.length); //stepNumber+1,
    setXIsNext(!xIsNext);
                
  }

      const currenthistory = history;
      const current = currenthistory[stepNumber];
      const winnerInfo = calculateWinner(current.squares);
      const winner = winnerInfo ? winnerInfo[0] : winnerInfo;
      const winnerCells = winnerInfo ? winnerInfo.slice(1) : winnerInfo;
  
      let moves = currenthistory.map( (step,move) => {
          const desc = move ? 'Go to move #' + move + ' : ' + (step.picked%3+1) + ',' +  (Math.floor(step.picked/3)+1)
                            : 'Go to game start' ;
          const formatClass = (move === stepNumber ? 'bold' : '');
          return (
            <li key={move}>
              <button className={formatClass} onClick={ () => jumpTo(move, move) }>{desc}</button>
            </li>
          );
      });
      if (movesAsc === false) {
        moves = moves.reverse();
      }
  
      let status;
      if (winner) {
        if(winner === 'draw')
            status = 'Match resulted in a draw';
        else
            status = 'Winner: ' + winner;
      }
      else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O') ;
      }
  
      const oppOrder = movesAsc ? 'descending' : 'ascending';
      let toggleButton = <button onClick={ () => toggleOrder() }>Toggle moves order to {oppOrder}</button>
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winnerCells={winnerCells}
              onClick={ (i) => handleClick(i) }
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>{toggleButton}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
  }
  
    



  export default Game;