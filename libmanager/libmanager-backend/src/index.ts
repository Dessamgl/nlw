import 'reflect-metadata';
import 'dotenv/config';

import { createDbConnection } from './database';
import { Server } from './routes/server';

createDbConnection();

const server = new Server();
server.start();
