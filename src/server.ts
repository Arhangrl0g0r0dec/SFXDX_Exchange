import express, {Request, Response} from 'express';
import { config } from './config/config';
import router from './router/router';
import swaggerUI from 'swagger-ui-express';
import swaggerOptions from './swagger/documentation.json';
import { changeLevel, loggerHttp, logger } from './logger/logger';

const app = express();
app.use(express.json());
app.use(loggerHttp);
app.use('/changeLevel', (req: Request, res: Response) => {
  const level: number = req.body.level;
  const result: number = changeLevel(level);
  result == 0? res.status(204).json() : res.status(400).json({ error: true, message: 'Данного уровня логов не существует', DATA: {}, warning: '' }); 
});
app.use('/', router
/* 
  #swagger.tags = ['Main']
 */
);
//Документация swagger
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerOptions));

app.use((req: any, res: any) => res.status(404).json({ error: true, message: '404 request not found', DATA: {}, warning: '' }));

const server = app.listen(config.server.port, () => console.log(`Server starting on http://${config.server.host}:${config.server.port}`));

process.on('uncaughtException', (err) => {
  logger.fatal({ data: 'Обнаружено неотловимое исключение', result: err});
  
  server.close(() => {
    process.exit(1);
  });

  setTimeout(() => {
    process.abort();
  }, 1000).unref()
  
  process.exit(1);
});
export default server;