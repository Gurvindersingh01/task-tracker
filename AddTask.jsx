import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ refresh }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));

    await axios.post("http://localhost:5000/api/tasks", data);
    refresh();
    setForm({ title: "", description: "", dueDate: "", image: null });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Task</h2>

      <input
        style={styles.input}
        placeholder="Task Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        style={styles.input}
        placeholder="Description"
        rows="3"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        style={styles.input}
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <input
        style={styles.input}
        type="file"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
      />

      <button style={styles.button}>Add Task</button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #cbd5f5",
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default AddTask;
