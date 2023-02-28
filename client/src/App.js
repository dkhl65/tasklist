import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [ready, setReady] = useState(false);

  const refresh = () => {
    axios
      .get(`${BASE_URL}/`)
      .then((response) => {
        setTaskList(response.data.tasklist);
        setReady(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    refresh();
  }, []);

  const onDelete = (id) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .catch((error) => console.log(error))
      .then(() => refresh());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/`, {
        task: task,
      })
      .then(() => refresh());
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button type="submit">Submit</button>
      </form>
      {ready ? (
        taskList.map((item) => (
          <div key={item.id}>
            <h3>{item.task}</h3>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default App;
