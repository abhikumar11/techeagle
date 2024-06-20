const Task = require('../models/task');

exports.addTask = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
    try {
        const task = new Task({ name, user: userId });
        await task.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const userId = req.user.id;
    try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    const {action } = req.body;
    console.log(action);
    const userId = req.user.id;
    try {
        const task = await Task.findOne({ _id:req.params.id, user: userId });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const now = new Date();
        switch (action) {
            case 'start':
              if (task.status !== 'Pending') return res.status(400).send('Invalid action');
              task.status = 'Ongoing';
              task.startTime = now;
              break;
            case 'pause':
              if (task.status !== 'Ongoing') return res.status(400).send('Invalid action');
              task.status = 'Paused';
              task.duration += Math.floor((now - task.startTime) / 1000);
              task.startTime = null;
              break;
            case 'resume':
              if (task.status !== 'Paused') return res.status(400).send('Invalid action');
              task.status = 'Ongoing';
              task.startTime = now;
              break;
            case 'end':
              if (task.status !== 'Ongoing') return res.status(400).send('Invalid action');
              task.status = 'Completed';
              task.duration += Math.floor((now - task.startTime) / 1000);
              task.startTime = null;
              task.endTime = now;
              break;
            default:
              return res.status(400).send('Invalid action');
          }

        task.history.push({ action, timestamp: now });
        await task.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteTask = async(req, res)=>{
    const task=await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).send('Task not found');
  res.send('Task deleted');
}