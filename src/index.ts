import express, { Express, Request, Response } from "express";
import multer from 'multer';
import {textFileControllers} from './controllers/textFileControllers'
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
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

 
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});