import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import config from './utils';

const app: Application = express();
const port = config.port;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!');
});

app.listen(port, () =>
  console.log(`Server is running at port http://localhost:${port}`),
);
