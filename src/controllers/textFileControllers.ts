import { Request, Response } from "express"
import FileRepository from "../db/repositories/filesRepository";
import { AppDataSource } from "../db";


const uploadFileController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const fileName = req.file.originalname;
        const filePath=req.file.path;
        
        const fileRepository = new FileRepository({ dataSource: AppDataSource })
    
        const filePayload: FilePayload = {
            fileName: fileName,
            filePath: filePath
        }
        const fileResponse = await fileRepository.saveFile(filePayload)
        res.json({id:fileResponse.raw[0].id})
    } catch (error) {
        return res.status(500).json({ error: error||'Internal Server Error' });
    }
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