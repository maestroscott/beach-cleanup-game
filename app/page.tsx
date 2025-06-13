'use client';

import React, { useState } from 'react';

const trashItems = [
  { id: 1, top: '30%', left: '20%' },
  { id: 2, top: '50%', left: '70%' },
  { id: 3, top: '65%', left: '40%' },
  { id: 4, top: '20%', left: '55%' },
  { id: 5, top: '80%', left: '10%' },
];

export default function BeachCleanupGame() {
  const [foundItems, setFoundItems] = useState<number[]>([]);
  const [level, setLevel] = useState(1);

  const handleFind = (id: number) => {
    if (!foundItems.includes(id)) {
      const sound = new Audio('/click.mp3');
      sound.play();
      setFoundItems([...foundItems, id]);
    }
  };

  const handleNextLevel = () => {
    setLevel(2);
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      {level === 1 ? (
        <div className="relative w-full aspect-[4/3] bg-[url('/beach.jpg')] bg-cover bg-center border rounded-xl shadow-md">
          {trashItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleFind(item.id)}
              className={`absolute w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full opacity-70 hover:opacity-100 transition-transform duration-200 ${
                foundItems.includes(item.id) ? 'scale-0' : 'scale-100'
              }`}
              style={{ top: item.top, left: item.left }}
              aria-label={`Trash item ${item.id}`}
            />
          ))}
          {foundItems.length === trashItems.length && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/60 rounded-xl">
              <button
                onClick={handleNextLevel}
                className="bg-white text-black text-base sm:text-xl px-4 py-2 rounded shadow"
              >
                Go to Level 2
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 space-y-4 text-base sm:text-lg">
          <p>🎉 Great job! Now it’s time to clean up the real world.</p>
          <p>
            Head to a local beach, park, or public space and pick up 5 pieces of litter. Be safe—wear gloves and
            dispose or recycle properly!
          </p>
          <p>
            Learn more from <a href="https://www.take3.org/" target="_blank" className="underline text-blue-600">Take 3 for the Sea</a>
          </p>
          <p>
            More info on plastic pollution: <a href="https://oceanconservancy.org/trash-free-seas/" target="_blank" className="underline text-blue-600">Ocean Conservancy</a>
          </p>
        </div>
      )}
    </div>
  );
}
