import { startServer } from './server';
import auth from './routes/auth';

startServer([auth]);
