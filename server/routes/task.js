const express = require('express');
const { addTask, getTasks, updateTaskStatus,deleteTask } = require('../controller/TaskController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/add', protect, addTask);
router.get('/', protect, getTasks);
router.patch('/:id', protect, updateTaskStatus);
router.delete('/:id', protect,deleteTask);

module.exports = router;
