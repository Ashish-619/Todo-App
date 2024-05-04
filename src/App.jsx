import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [addTask, setAddTask] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function addTaskToList() {
    if (inputValue.trim() !== '') {
      setAddTask([...addTask, inputValue]);
      setInputValue('');
    }
  }

  function removeTask(index) {
    const updatedTask = [...addTask];
    updatedTask.splice(index, 1);
    setAddTask(updatedTask);
  }

  function editTask(index) {
    setEditIndex(index);
    setInputValue(addTask[index]);
  }

  function saveEditedTask() {
    if (inputValue.trim() !== '') {
      const updatedTask = [...addTask];
      updatedTask[editIndex] = inputValue;
      setAddTask(updatedTask);
      setInputValue('');
      setEditIndex(null);
    }
  }

  return (
    <div className='main'>
      <h1>Todo App</h1>
      <div className="container">
        <input
          type="text"
          value={inputValue}
          placeholder='Enter text'
          onChange={handleChange}
        />
      </div>
      {editIndex === null ? (
        <button id="addButton" onClick={addTaskToList}>Add</button>
      ) : (
        <button onClick={saveEditedTask}>Save</button>
      )}
      <div className='showList'>
        {addTask.map((item, index) => {
          return (
            <div className="listItem" key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <span>{item}</span>
                  <button id="removeButton" onClick={() => removeTask(index)}>remove</button>
                  <button id="editButton" onClick={() => editTask(index)}>edit</button>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;
