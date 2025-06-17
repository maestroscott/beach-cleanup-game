'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

type TrashItem = { id: number; top: string; left: string };

const generateTrashItems = (): TrashItem[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    top: `${20 + Math.random() * 60}%`,
    left: `${10 + Math.random() * 70}%`,
  }));
};

export default function BeachCleanupGame() {
  const [foundItems, setFoundItems] = useState<number[]>([]);
  const [level, setLevel] = useState(0); // 0 = splash, 1 = game, 2 = level 2, 3 = end screen
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);

  useEffect(() => {
    if (level === 1 || level === 2) {
      setTrashItems(generateTrashItems());
      setFoundItems([]);
    }
  }, [level]);

  useEffect(() => {
    if (foundItems.length === 5) {
      confetti();
    }
  }, [foundItems]);

  const handleFind = (id: number) => {
    if (!foundItems.includes(id)) {
      const sound = new Audio('/click.mp3');
      sound.play();
      setFoundItems([...foundItems, id]);
    }
  };

  const handleStart = () => {
    setLevel(1);
  };

  const handleNextLevel = () => {
    setLevel(level + 1);
  };

  const handleReplay = () => {
    setLevel(1);
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      {level === 0 && (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 space-y-4 text-base sm:text-lg text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">🌊 Beach Cleanup Game 🌊</h1>
          <p className="text-lg">The beaches are being destroyed.</p>
          <p className="text-lg font-semibold">Help save the beaches by picking up five pieces of trash!</p>
          <button
            onClick={handleStart}
            className="mt-6 bg-blue-500 hover:bg-blue-600 transition text-white text-xl px-6 py-3 rounded-full shadow-lg"
          >
            Start Game
          </button>
        </div>
      )}

      {(level === 1 || level === 2) && (
        <div className="relative w-full aspect-[4/3] bg-[url('/beach.jpg')] bg-cover bg-center border rounded-xl shadow-md overflow-hidden">
          {trashItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleFind(item.id)}
              className={`absolute transition-all duration-300 ${
                foundItems.includes(item.id)
                  ? 'scale-0 opacity-0 rotate-12'
                  : 'scale-100 opacity-100 hover:scale-110'
              }`}
              style={{ top: item.top, left: item.left }}
              aria-label={`Trash item ${item.id}`}
            >
              <img
                src={`/trash${item.id}.png`}
                alt={`Trash item ${item.id}`}
                className="w-16 h-16 drop-shadow-lg animate-bounce"
              />
            </button>
          ))}

          {foundItems.length === trashItems.length && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/60 rounded-xl transition-opacity">
              <button
                onClick={handleNextLevel}
                className="bg-yellow-400 text-black text-xl font-bold px-6 py-3 rounded-full shadow-lg animate-pulse"
              >
                {level === 1 ? 'Go to Level 2' : 'Finish'}
              </button>
            </div>
          )}
        </div>
      )}

      {level === 3 && (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 space-y-4 text-base sm:text-lg">
          <p className="text-xl font-semibold">🎉 Great job!</p>
          <p>Now it’s time to clean up the real world:</p>
          <ul className="list-disc list-inside">
            <li>Visit a local beach or park</li>
            <li>Pick up 5 pieces of litter</li>
            <li>Be safe — wear gloves and dispose or recycle properly!</li>
          </ul>
          <p>
            Learn more about keeping our beaches clean:{' '}
            <a href="https://www.take3.org/" target="_blank" className="underline text-blue-600">Take 3 for the Sea</a>{' '}
            and{' '}
            <a href="https://oceanconservancy.org/trash-free-seas/" target="_blank" className="underline text-blue-600">Ocean Conservancy</a>{' '}
            are two great organizations helping to protect our oceans.
          </p>
          <div className="flex justify-center">
            <button onClick={handleReplay} className="bg-green-500 hover:bg-green-600 transition text-white text-xl px-6 py-3 rounded-full shadow-lg">
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}