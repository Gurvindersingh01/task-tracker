import React, { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Student Task Tracker</h1>

        <AddTask refresh={() => setRefresh(!refresh)} />
        <TaskList key={refresh} />
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 40,
  },
  card: {
    width: "900px",
    background: "#ffffff",
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: 30,
    color: "#1e293b",
  },
};

export default App;
