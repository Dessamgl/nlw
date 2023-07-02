import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors as celebrateErrors } from 'celebrate';
import cors from 'cors';
import { AppError } from '../errors/AppError';

import { routes } from './index.routes';

export class Server {
  private server: Express;

  constructor() {
    this.server = express();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(routes);
  }

  private errors() {
    this.server.use(celebrateErrors());
    this.server.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            message: err.message,
          });
        }

        return response.status(500).json({
          status: 'error',
          message: `Internal server error - ${err.message}`,
        });
      },
    );
  }

  public start() {
    this.middlewares();
    this.routes();
    this.errors();

    // eslint-disable-next-line no-console
    this.server.listen(3333, () => console.log('Server started on port 3333'));
  }
}
