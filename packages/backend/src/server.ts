import app from './app.ts';
import { config, connectDatabase } from './config/index.ts';
import { Logger } from './lib/utils/loggers/index.ts';

const startServer = async () => {
  await connectDatabase();
  app.listen(config.port, () => Logger.info(`Listening ${config.port}`));
};

startServer();
