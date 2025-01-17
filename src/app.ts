import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { userRouter } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/users/api/v1', userRouter);

export default app;
