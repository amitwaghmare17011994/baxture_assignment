import { Request, Response } from 'express';

import { AppDataSource } from '../db';
import FileRepository from '../db/repositories/filesRepository';
import TaskRepository from '../db/repositories/tasksRepository';
import { countUniqueWords, countWords, findTopKWords } from '../utils';

const OPTION_ACTION_MAP: any = {
    "countWords": countWords,
    "countUniqueWords": countUniqueWords,
    "findTopKWords": findTopKWords
}


const uploadFileController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const fileName = req.file.originalname;
        const filePath = req.file.path;

        const fileRepository = new FileRepository({ dataSource: AppDataSource })

        const filePayload: FilePayload = {
            fileName: fileName,
            filePath: filePath
        }
        const fileResponse = await fileRepository.saveFile(filePayload)
        return res.status(200).json({ id: fileResponse.raw[0].id })
    } catch (error) {
        return res.status(500).json({ error: error || 'Internal Server Error' });
    }
}

const analyzeFileController = async (req: Request, res: Response) => {
    try {
        const { fileId } = req.params;
        const { operation, options } = req.body || {};
        const fileRepository = new FileRepository({ dataSource: AppDataSource })
        const fileFromDb = await fileRepository.getFileById(parseInt(fileId))
        if (!fileFromDb) {
            return res.status(400).json({ error: 'No file found' });
        }
        const { filePath } = fileFromDb;
        const fs = require('node:fs');
        const data = fs.readFileSync(filePath, 'utf8');
        const action = OPTION_ACTION_MAP[operation];

        if (!action) {
            return res.status(400).json({ error: 'Pass valid operation' })
        }

        const result = action(data, options);
        if (result.error) {
            return res.status(400).json({ error: result.error })
        }
        const taskRepository = new TaskRepository({ dataSource: AppDataSource })

        const taskResponse = await taskRepository.saveTask({
            operation: operation,
            options: options ? JSON.stringify(options) : "",
            result: JSON.stringify({ result })
        })

        return res.json({ id: taskResponse.raw[0].id })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

const fileResulstsController = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const taskRepository = new TaskRepository({ dataSource: AppDataSource })
    const task = await taskRepository.getTaskById(parseInt(taskId))
    if (!task) {
        return res.status(400).json({ error: 'Task not found' });
    }
    res.json({ result: task })
}

export const textFileControllers = {
    uploadFileController,
    analyzeFileController,
    fileResulstsController
}