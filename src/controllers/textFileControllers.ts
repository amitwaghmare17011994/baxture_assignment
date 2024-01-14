import { Request, Response } from "express"
import FileRepository from "../db/repositories/filesRepository";
import { AppDataSource } from "../db";
const fs = require('node:fs');


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
        return res.json({id:fileResponse.raw[0].id})
    } catch (error) {
        return res.status(500).json({ error: error||'Internal Server Error' });
    }
}

const analyzeFileController = async (req: Request, res: Response) => {
    try {
        const { fileId } = req.params;
        const { operation, options } = req.body || {};
        const fileRepository = new FileRepository({ dataSource: AppDataSource })
        const fileFromDb=await fileRepository.getFileById(parseInt(fileId))
        if(!fileFromDb){
            return res.status(400).json({ error: 'No file found' });
        }
        const {filePath}=fileFromDb;
        const data = fs.readFileSync(filePath, 'utf8');
        return res.json({fileFromDb})
    } catch (error) {
        res.status(500).json({error:error})
    }
}

const fileResulstsController = (req: Request, res: Response) => {
    res.json({})
}

export const textFileControllers = {
    uploadFileController,
    analyzeFileController,
    fileResulstsController
}