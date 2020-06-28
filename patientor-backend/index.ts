import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagose';
import patientsRouter from './routes/patient';

const app = express();
const PORT = 3001;

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use('/api/diagnoses/', diagnoseRouter);
app.use('/api/patients/', patientsRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
