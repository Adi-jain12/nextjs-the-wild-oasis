import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import guestRoutes from './routes/guestRoutes';
import settingsRoutes from './routes/settingsRoutes';
import bookingRoutes from './routes/bookingRoutes';
import cabinRoutes from './routes/cabinRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1/guest', guestRoutes);
app.use('/api/v1/cabin', cabinRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/settings', settingsRoutes);

const port = Number(process.env.PORT) || 3001;

app.listen(port, '0.0.0.0', () => {
	console.log(`Server running on port ${port}`);
});
