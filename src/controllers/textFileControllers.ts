import { Request, Response } from 'express';

import { AppDataSource } from '../db';
import FileRepository from '../db/repositories/filesRepository';
import { countUniqueWords, countWords, findTopKWords } from '../utils';

const OPTION_ACTION_MAP:any={
    "countWords":countWords,
    "countUniqueWords":countUniqueWords,
    "findTopKWords":findTopKWords
}


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
        const fs = require('node:fs');
        const data = fs.readFileSync(filePath, 'utf8');
        const action=OPTION_ACTION_MAP[operation];

        if(!action){
            return res.status(400).json({error:'Pass valid operation'})
        }

        const result=action(data,options);
        if(result.error){
             return res.status(400).json({error:result.error})
        }
        return res.json({result:  result})
    } catch (error) {
        console.log(error)
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