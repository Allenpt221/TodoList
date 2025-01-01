import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';

import router from './router/TodoList.router.js';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/tasks', router);



app.listen(PORT, () => {
    console.log(`Server listen to http://localhost:${PORT}`);
    ConnectDB();
});