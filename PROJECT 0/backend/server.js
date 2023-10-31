import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from './config/db.js'
import cookieParser from "cookie-parser";

dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) =>  res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);
   
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));