import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addTask, deleteTask, getTasks, updateTask } from '../redux/action';

const List = () => {
  const [newActivity, setNewActivity] = useState('');
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.task);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addTask(newActivity));
    setNewActivity('');
  };

  const handleUpdate = (id, action) => {
    dispatch(updateTask(id, action));
  };

  const handleDelete = id => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <h2>To-Do List</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="New activity"
        value={newActivity}
        onChange={e => setNewActivity(e.target.value)}
      />
      <button onClick={handleAdd} disabled={loading}>
        Add Activity
      </button>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Activity Name</th>
            <th>Activity Duration</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {tasks.map((activity, index) => (
            <tr key={activity._id}>
              <td>{index + 1}</td>
              <td>{activity.name}</td>
              <td>{new Date(activity.duration * 1000).toISOString().substr(11, 8)}</td>
              <td>
                {activity.status === 'Ongoing' && (
                  <>
                    <button onClick={() => handleUpdate(activity._id, 'pause')}>
                      Pause
                    </button>
                    <button onClick={() => handleUpdate(activity._id, 'end')}>
                      End
                    </button>
                  </>
                )}
                {activity.status === 'Paused' && (
                  <button onClick={() => handleUpdate(activity._id, 'resume')}>
                    Resume
                  </button>
                )}
                {activity.status === 'Pending' && (
                  <button onClick={() => handleUpdate(activity._id, 'start')}>
                    Start
                  </button>
                )}
                <button onClick={() => handleDelete(activity._id)}>Delete</button>
              </td>
              <td>{activity.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
