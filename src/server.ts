import app from './app';
import { initDB } from './db';
import config from './utils';

const main = () => {
  initDB();
  app.listen(config.port, () =>
    console.log(`Server is running at port http://localhost:${config.port}`),
  );
};

main();
