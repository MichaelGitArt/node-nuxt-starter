// const app: express.Application = require('./src/app')

import app from './src/app';
import { appPort } from './src/config/app.config';

app.listen(appPort, function () {
  console.log(`App is listening on port ${appPort}`);
});
