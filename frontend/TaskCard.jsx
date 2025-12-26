import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="task-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
            {task.image && <img src={`http://localhost:5000/${task.image}`} alt="task" style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>}
            <div style={{ marginTop: '10px' }}>
                <button onClick={() => onEdit(task)} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => onDelete(task._id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;
