import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import router from './app/routes';
import notFound from './app/middleware/NotFound';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/api/v1', router);
app.use(notFound);
export default app;
