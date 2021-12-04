import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { Logger } from 'winston';

import logger from '../infrastructure/logger/logger';
import router from './router';
import swagger from '../infrastructure/documentation/swagger';
import environmentVariablesLoader from '../infrastructure/constants/environmentVariablesLoader';

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));

app.set('views', './views');
app.set('view engine', 'ejs');
app.set('trust proxy', true);

app.use(morgan('combined', {
  stream: {
    write: (message: string): Logger => logger.http(message),
  },
}));

app.use(compression());
app.use(helmet());
app.use(cors());
app.disable('x-powered-by');

app.use('/static', express.static('./static'));

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swagger, { explorer: true }));
app.use('/api/v1', router);

export function start(): void {
  app.listen(environmentVariablesLoader.variables.PORT, (): void => {
    logger.info('서버 시작');
  });
}

export default app;
