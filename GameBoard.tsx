// GameBoard.tsx
import React, { useState } from 'react';

const GameBoard = ({ selectedShape, playerColor, isFirstTurn }) => {
  const [board, setBoard] = useState(Array(20).fill(Array(20).fill(null)));
  const [selectedCell, setSelectedCell] = useState(null);

  const isCornerCell = (rowIndex, colIndex) => {
    return (
      (rowIndex === 0 || rowIndex === 19) &&
      (colIndex === 0 || colIndex === 19)
    );
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (isFirstTurn && !isCornerCell(rowIndex, colIndex)) return;
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  const renderCell = (rowIndex, colIndex) => {
    const isSelected =
      selectedCell &&
      selectedCell.row === rowIndex &&
      selectedCell.col === colIndex;
    return (
      <div
        key={`${rowIndex}-${colIndex}`}
        className={`w-8 h-8 border ${
          isSelected ? `bg-${playerColor}-500` : 'bg-gray-200'
        }`}
        onClick={() => handleCellClick(rowIndex, colIndex)}
      />
    );
  };

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} className="flex">
      {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
    </div>
  );

  return (
    <div className="gameboard">
      {board.map((row, rowIndex) => renderRow(row, rowIndex))}
    </div>
  );
};

export default GameBoard;
