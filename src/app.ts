import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import taskRoutes from './routes/taskRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();
app.use(express.json());
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);
export default app;
