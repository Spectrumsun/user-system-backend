import debug from 'debug';
import app from './app';
import env from './config/environment';

const logger = debug('log');

app.listen(env.PORT);

logger(`Find me on http://localhost:${env.PORT}`);