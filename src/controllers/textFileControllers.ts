import { Request, Response } from "express"


const uploadFileController = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // const fileId = Math.random();
    // const filename = req.file.originalname;
    // const uploadDate = new Date();
    // const content = req.file.buffer.toString();
    // res.json({ fileId, filename, uploadDate, content });
    console.log(req.file)
    res.json({})
 }

const analyzeFileController = (req: Request, res: Response) => {
    res.json({})
}

const fileResulstsController = (req: Request, res: Response) => {
    res.json({})
}

export const textFileControllers = {
    uploadFileController,
    analyzeFileController,
    fileResulstsController
}