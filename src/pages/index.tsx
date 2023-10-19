import React, { useEffect, useState } from "react";
import DataItem from "../types/dataTypes";
import mockData from "../data/mockData";
import EditDataItem from "../components/editDataItem";
import CreateDataItem from "../components/createDataItem";
import { fetchHikes, createHike, updateHike, deleteHike } from "../api/api";

const Home: React.FC = () => {
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [data, setData] = useState<DataItem[]>(mockData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hikes: DataItem[] = await fetchHikes();
        setData(hikes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const validation = (item: DataItem) => {
    var errorMessage = "";

    if (item.id < 0) {
      errorMessage = errorMessage + "- ID must be greater than 0\n";
    }
    if (item.name === "") {
      errorMessage = errorMessage + "- Name cannot be empty\n";
    }
    if (item.distance <= 0) {
      errorMessage = errorMessage + "- Distance must be greater than 0\n";
    }
    if (item.elevation <= 0) {
      errorMessage = errorMessage + "- Elevation must be greater than 0\n";
    }
    if (item.difficulty === "") {
      errorMessage = errorMessage + "- Difficulty cannot be empty\n";
    }
    if (item.description === "") {
      errorMessage = errorMessage + "- Description cannot be empty\n";
    }

    if (errorMessage !== "") {
      throw new Error(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHike(id);
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      setEditItemId(null);
    } catch (error) {
      // Handle error
    }
  };

  const handleEditClick = (id: number) => {
    setEditItemId(id);
  };

  const handleUpdate = async (updatedItem: DataItem) => {
    try {
      validation(updatedItem);
      await updateHike(updatedItem);
      const updatedData = data.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setData(updatedData);
      setEditItemId(null);
    } catch (error) {
      // Handle error
    }
  };

  const handleCreate = async (newItem: DataItem) => {
    try {
      validation(newItem);
      const createdItem: DataItem = await createHike(newItem);
      setData([...data, createdItem]);
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div>
      <h1>Hiking Trails</h1>
      <CreateDataItem onCreate={handleCreate} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Distance</th>
            <th>Elevation</th>
            <th>Difficulty</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: DataItem) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.distance} kilometers </td>
              <td>{item.elevation} meters </td>
              <td>{item.difficulty}</td>
              <td>{item.description}</td>
              <td>
                {editItemId === item.id ? (
                  <EditDataItem
                    dataItem={item}
                    onUpdate={handleUpdate}
                    onDelete={() => handleDelete(item.id)} // Pass the delete function
                  />
                ) : (
                  <button onClick={() => handleEditClick(item.id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
