import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className={`square ${value === 'O' ? 'o-square' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
  
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
  
    // Get a list of all the empty squares
    const emptySquares = [];
    for (let j = 0; j < nextSquares.length; j++) {
      if (!nextSquares[j]) {
        emptySquares.push(j);
      }
    }
  
    // Choose a random empty square to place "O"
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const randomSquare = emptySquares[randomIndex];
    nextSquares[randomSquare] = 'O';
  
    setSquares(nextSquares);
  }
  
  // function clearBoard() that clears all the values of the board
  function clearBoard() {
    setSquares(Array(9).fill(null));
  }
  
  return (
    <>
      <div className="board-container">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <button className="clear-button" onClick={clearBoard}>Clear Board</button>
    </>
  );
}