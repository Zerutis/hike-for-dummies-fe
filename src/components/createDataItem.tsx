// components/CreateDataItem.tsx
import React, { useState } from 'react';
import DataItem from '../types/dataTypes';

interface CreateDataItemProps {
  onCreate: (newItem: DataItem) => void;
}

const CreateDataItem: React.FC<CreateDataItemProps> = ({ onCreate }) => {
  const [newItem, setNewItem] = useState<DataItem>({
    id: 0,
    name: '',
    distance: 0,
    elevation: 0,
    difficulty: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleCreateClick = () => {
    onCreate(newItem);
    // Reset the form after creating a new item
    setNewItem({
      id: 0,
      name: '',
      distance: 0,
      elevation: 0,
      difficulty: '',
      description: '',
    });
  };

  return (
    <div>
      <h2>Create Data Item</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={newItem.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Distance:</label>
          <input type="number" name="distance" value={newItem.distance} onChange={handleInputChange} />
        </div>
        <div>
          <label>Elevation:</label>
          <input type="number" name="elevation" value={newItem.elevation} onChange={handleInputChange} />
        </div>
        <div>
          <label>Difficulty:</label>
          <input type="text" name="difficulty" value={newItem.difficulty} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={newItem.description} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleCreateClick}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateDataItem;
