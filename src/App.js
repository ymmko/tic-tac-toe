import { useState, useEffect } from 'react';

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
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    if (!xIsNext) {
      const emptySquares = nextSquares.map((square, index) => {
        if (!square) {
          return index;
        }
        return null;
      }).filter(square => square !== null);

      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const randomSquare = emptySquares[randomIndex];

      nextSquares[randomSquare] = 'O';
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  useEffect(() => {
    if (!xIsNext) {
      const emptySquares = squares.map((square, index) => {
        if (!square) {
          return index;
        }
        return null;
      }).filter(square => square !== null);

      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const randomSquare = emptySquares[randomIndex];

      const nextSquares = squares.slice();
      nextSquares[randomSquare] = 'O';

      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    }
  }, [xIsNext, squares]);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "Draw";
  }

  // function clearBoard() that clears all the values of the board
  function clearBoard() {
    setSquares(Array(9).fill(null));
  }

  return (
    <>
      <div className="board-container">
        <h1>Tic Tac Toe</h1>
        <h3>You are X</h3>
        <div className="status">{status}</div>
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
        <button className="clear-button" onClick={clearBoard}>Clear Board</button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
