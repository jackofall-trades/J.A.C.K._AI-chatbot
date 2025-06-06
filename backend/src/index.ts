import express from 'express';
import { config } from 'dotenv';
import {  connectToDatabase, disconnectFromDatabase } from './db/connection';
import morgan from 'morgan';
import appRouter from './routes';

config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 5001;

//for reading and parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev")); // Logging middleware
app.use("/api/v1", appRouter); // Importing routes


//connect to the database
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port} & connected to the database`);
});
  })
  .catch((error) => console.error('Failed to connect to the database:', error));

