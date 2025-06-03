import express from 'express';
import donanteRoutes from './modules/donantes/presentation/routes';
import { AppDataSource } from './config/typeorm.config';
import { sequelize } from './config/sequelize.config';

const app = express();
app.use(express.json());
app.use('/donantes', donanteRoutes);

AppDataSource.initialize()
  .then(async () => {
    await sequelize.sync();
    console.log('Bases de datos conectadas');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((err) => console.error('Error al conectar DB', err));