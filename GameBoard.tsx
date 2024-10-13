// GameBoard.tsx
import React, { useState } from 'react';

const GameBoard = () => {
  const [board, setBoard] = useState(Array(20).fill(Array(20).fill(null)));
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (rowIndex, colIndex) => {
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
          isSelected ? 'bg-blue-500' : 'bg-gray-200'
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
