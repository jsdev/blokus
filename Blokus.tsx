import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import GameBoard from './GameBoard';
import { RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';

// Define player colors
const playerColors = ['red', 'blue', 'green', 'yellow'];

// Define the shapes for each category
const shapes = {
  Monomino: [[[1]]],
  Domino: [
    [
      [0, 0],
      [1, 1],
    ],
  ],

  Triminos: [
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  Tetrominos: [
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  Pentominos: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  ],
};

// Function to generate player shapes with color
const generatePlayerShapes = (color) => {
  const colorShapes = {};
  Object.keys(shapes).forEach((category) => {
    colorShapes[category] = shapes[category].map((shape) =>
      shape.map((row) => row.map((cell) => (cell ? color : 0)))
    );
  });
  return colorShapes;
};

const ShapeGrid = ({ shape, size }) => (
  <div className={`shape-${size}`}>
    {shape.map((row, i) =>
      row.map((cell, j) => (
        <div
          key={`${i}-${j}`}
          className={`w-8 h-8 ${cell ? `bg-${cell}-500` : 'bg-gray-200'}`}
        />
      ))
    )}
  </div>
);

const ManipulateView = ({ shape, setShape }) => {
  const rotateShape = () => {
    setShape(
      shape[0].map((_, index) => shape.map((row) => row[index]).reverse())
    );
  };

  const flipHorizontal = () => {
    setShape(shape.map((row) => [...row].reverse()));
  };

  const flipVertical = () => {
    setShape([...shape].reverse());
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={rotateShape}
        className="p-2 bg-blue-500 text-white rounded"
      >
        <RotateCw size={24} />
      </button>
      <button
        onClick={flipHorizontal}
        className="p-2 bg-blue-500 text-white rounded"
      >
        <FlipHorizontal size={24} />
      </button>
      <button
        onClick={flipVertical}
        className="p-2 bg-blue-500 text-white rounded"
      >
        <FlipVertical size={24} />
      </button>
    </div>
  );
};

const ShapeCategory = ({ category, shapes, color }) => {
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const size = shapes[0].length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color }}>
        {category} ({shapes.length})
      </h2>
      <div className="flex items-start space-x-8">
        <div>
          <ShapeGrid shape={selectedShape} size={size} />
          <ManipulateView shape={selectedShape} setShape={setSelectedShape} />
        </div>
        <div className="pieces">
          {shapes.map((shape, index) => (
            <button
              key={index}
              onClick={() => setSelectedShape(shape)}
              className={`shape-${size} ${
                selectedShape === shape ? 'bg-blue-200' : 'bg-gray-100'
              }`}
            >
              <ShapeGrid shape={shape} size={size} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlokusShapesApp = () => {
  const [players, setPlayers] = useState(playerColors.map(generatePlayerShapes));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [selectedShape, setSelectedShape] = useState(null);
  const currentPlayer = players[currentPlayerIndex];

  const passTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    setIsFirstTurn(false);
  };

  const playPiece = (category, shapeIndex) => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex][category].splice(shapeIndex, 1);
    setPlayers(updatedPlayers);
    passTurn();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blokus</h1>
      <GameBoard
        selectedShape={selectedShape}
        playerColor={playerColors[currentPlayerIndex]}
        isFirstTurn={isFirstTurn}
      />
      <Tab.Group>
        <Tab.List className="flex space-x-4 mb-6">
          {Object.keys(currentPlayer).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `px-4 py-2 rounded-lg focus:outline-none ${
                  selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.entries(currentPlayer).map(([category, categoryShapes]) => (
            <Tab.Panel key={category}>
              <ShapeCategory
                category={category}
                shapes={categoryShapes}
                color={playerColors[currentPlayerIndex]}
                setSelectedShape={setSelectedShape}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={passTurn}
          className="p-2 bg-yellow-500 text-white rounded"
        >
          Pass
        </button>
        <button
          onClick={() => playPiece('Monomino', 0)}
          className="p-2 bg-green-500 text-white rounded"
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default BlokusShapesApp;
