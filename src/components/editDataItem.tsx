import React, { useState } from 'react';
import DataItem from '../types/dataTypes';

interface EditDataItemProps {
  dataItem: DataItem;
  onUpdate: (updatedItem: DataItem) => void;
  onDelete: () => void;
}

const EditDataItem: React.FC<EditDataItemProps> = ({ dataItem, onUpdate, onDelete }) => {
  const [editedItem, setEditedItem] = useState(dataItem);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    onUpdate(editedItem);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div>
      <h2>Edit Data Item</h2>
      <form>
        <div>
          <label>ID:</label>
          <input type="text" name="id" value={editedItem.id} readOnly />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Distance:</label>
          <input type="number" name="distance" value={editedItem.distance} onChange={handleInputChange} />
        </div>
        <div>
          <label>Elevation:</label>
          <input type="number" name="elevation" value={editedItem.elevation} onChange={handleInputChange} />
        </div>
        <div>
          <label>Difficulty:</label>
          <input type="text" name="difficulty" value={editedItem.difficulty} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={editedItem.description} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleUpdateClick}>
          Update
        </button>
        <button type="button" onClick={handleDeleteClick}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditDataItem;
