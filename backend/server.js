import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';
import cors from 'cors';

import router from './router/TodoList.router.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use('/api/tasks', router);

app.get('/', (req, res) => {
    res.send('server is running');
})



app.listen(PORT, () => {
    console.log(`Server listen to http://localhost:${PORT}`);
    ConnectDB();
});