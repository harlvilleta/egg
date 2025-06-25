'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

export default function NameInput() {
  const { userName, setUserName, previousNames, undoNameChange } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTempName(userName);
  }, [userName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditing(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleUndo = () => {
    undoNameChange();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-black">Welcome, Guest!</span>
      </div>
    );
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="px-2 py-1 border rounded text-gray-900"
          placeholder="Enter your name"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setTempName(userName);
            setIsEditing(false);
          }}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-black">Welcome, {userName}!</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm text-blue-600 hover:text-blue-700 underline"
        >
          Change Name
        </button>
        {previousNames.length > 0 && (
          <button
            onClick={handleUndo}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Undo
          </button>
        )}
      </div>
      {isSaved && (
        <span className="text-green-600 text-sm">
          {previousNames.length > 0 ? 'Name restored!' : 'Name saved!'}
        </span>
      )}
    </div>
  );
} 