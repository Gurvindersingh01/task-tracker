import React, { useState } from 'react';
import { API } from '../api';

const EditTask = ({ task, onUpdated, onCancel }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');
    const [status, setStatus] = useState(task.status);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(task.image ? `http://localhost:5000/${task.image}` : null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dueDate', dueDate);
        formData.append('status', status);
        if(image) formData.append('image', image);

        try {
            await API.put(`/tasks/${task._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onUpdated();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required /><br/>
            <textarea value={description} onChange={e => setDescription(e.target.value)} /><br/>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /><br/>
            <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
            </select><br/>
            <input type="file" accept="image/png, image/jpeg" onChange={handleImage} /><br/>
            {preview && <img src={preview} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>}<br/>
            <button type="submit">Update Task</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: '5px' }}>Cancel</button>
        </form>
    );
};

export default EditTask;
