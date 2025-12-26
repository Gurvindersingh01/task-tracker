import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <>
      <h2>Task List</h2>

      {tasks.map((task) => (
        <div style={styles.task} key={task._id}>
          {task.image && (
            <img src={task.image} alt="" style={styles.image} />
          )}

          <div style={{ flex: 1 }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <small>Status: {task.status}</small>
          </div>

          <button style={styles.delete} onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

const styles = {
  task: {
    display: "flex",
    gap: 15,
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 70,
    borderRadius: 6,
    objectFit: "cover",
  },
  delete: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default TaskList;
