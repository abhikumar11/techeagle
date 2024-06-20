const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const PORT =3001;
const app = express();


connectDB();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
