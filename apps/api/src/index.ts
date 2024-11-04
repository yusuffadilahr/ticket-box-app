import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import router from './routes/index';
import { connected } from './utils/ascii';
config({ path: '.env.development' });

const app: Express = express();
const port: string | undefined = process.env.PORT as string;
app.use(express.json());
const corsOption = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOption));
app.use('/api', router);

app.use('/welcome8000', (req: Request, res: Response) => {
  res.send(`<h1>Welcome to PORT ${port}</h1>`);
});

interface IError extends Error {
  msg: string;
  status: number;
}

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: true,
    message: error.msg || error.message,
    data: {},
  });
});

app.listen(port, () => {
  console.log(connected);
});
