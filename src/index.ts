import 'reflect-metadata';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import multer from 'multer';

import { textFileControllers } from './controllers/textFileControllers';
import { AppDataSource } from './db';

dotenv.config();


 
const app: Express = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
 

// Set up Multer for file uploads
 const storage=multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const upload = multer({ storage: storage });



app.post('/upload',upload.single('file'),textFileControllers.uploadFileController)
app.post('/analyze/:fileId',textFileControllers.analyzeFileController)
app.get('/results/:taskId',textFileControllers.fileResulstsController)

 

AppDataSource.initialize().then(async () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch((error)=>{
  console.log('databse connection failed',error)
})

 