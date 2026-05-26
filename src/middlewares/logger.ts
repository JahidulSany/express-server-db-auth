import type { NextFunction, Request, Response } from 'express';
import fs from 'fs';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `✅ Method: ${req.method}, URL: ${req.url}, Time: ${Date.now()}\n`;
  fs.appendFile('logger.txt', log, (error) => {});
  next();
};

export default logger;
