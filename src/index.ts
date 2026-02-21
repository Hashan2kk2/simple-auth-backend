import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { setupSwagger } from './swagger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/api/auth', authRoutes);

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Simple Auth Backend is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
