import 'reflect-metadata';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import multer from 'multer';

import { ALLWED_FILE_TYPES, FILE_UPLOAD_PATH } from '@constants/index';
import TextFileControllers from '@controllers/TextFileControllers';
import AppDataSource from '@db/index';

dotenv.config();


 
const app: Express = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
 

// Set up Multer for file uploads
 const storage=multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_UPLOAD_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const upload = multer({ storage: storage,fileFilter:(req, file, cb) => {
  console.log('type',file.mimetype,file)
  if (!ALLWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error('file is not allowed'))
  }
  cb(null, true)
} });



// TextFileControllers Object
const textFileControllers = new TextFileControllers({AppDataSource:AppDataSource});


// Routes
app.post('/upload',upload.single('file'),textFileControllers.uploadFileController)
app.post('/analyze/:fileId',textFileControllers.analyzeFileController)
app.get('/results/:taskId',textFileControllers.fileResulstsController)
// Routes

 

AppDataSource.initialize().then(async () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch((error)=>{
  console.log('databse connection failed',error)
})

 