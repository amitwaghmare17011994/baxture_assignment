import express, { Express, Request, Response } from "express";
import {textFileControllers} from './controllers/textFileControllers'
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
 
app.post('/upload',textFileControllers.uploadFileController)
app.post('/analyze/:fileId',textFileControllers.analyzeFileController)
app.get('/results/:taskId',textFileControllers.fileResulstsController)

 
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});