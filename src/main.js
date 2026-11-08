import express from 'express';
import { PORT } from './config.js';
import { connectDB } from './DB/connection.db.js';
import { userController,noteController } from './modules/index.js';

const app = express();
const port = PORT;
app.use(express.json());
app.use('/users', userController);
app.use('/notes', noteController);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Assignment 8'});
});


app.all('/*dummy', (req, res) => {
    return res.status(404).json({message: 'Route not found!'});
});

connectDB().then(() => {
        app.listen(port, () => {console.log(`Server running on port ${port}`);});})
    .catch((error) => {
        console.log('Server failed to start:', error);
    });