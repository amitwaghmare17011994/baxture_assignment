import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import FileRepository from '@repositories/FilesRepository';
import TaskRepository from '@repositories/TasksRepository';
import { countUniqueWords, countWords, findTopKWords } from '@utils/index';

const OPTION_ACTION_MAP: any = {
    "countWords": countWords,
    "countUniqueWords": countUniqueWords,
    "findTopKWords": findTopKWords
}


class TextFileControllers {
    AppDataSource: DataSource

    constructor(props: { AppDataSource: DataSource }) {
        this.AppDataSource = props.AppDataSource
    }
    
    uploadFileController = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const fileName = req.file.originalname;
            const filePath = req.file.path;

            const fileRepository = new FileRepository({ dataSource: this.AppDataSource })

            const filePayload: FilePayload = {
                fileName: fileName,
                filePath: filePath
            }
            const fileResponse = await fileRepository.saveFile(filePayload)
            return res.status(200).json({ id: fileResponse.raw[0].id })
        } catch (error) {
            //@ts-ignore
            return res.status(500).json({ error: error?.message || 'Internal Server Error' });
        }
    }

    analyzeFileController = async (req: Request, res: Response) => {
        try {
            const { fileId } = req.params;
            const { operation, options } = req.body || {};
            const fileRepository = new FileRepository({ dataSource: this.AppDataSource })
            const fileFromDb = await fileRepository.getFileById(parseInt(fileId))
            if (!fileFromDb) {
                return res.status(400).json({ error: 'File not found' });
            }
            const { filePath } = fileFromDb;
            const fs = require('node:fs');
            const data = fs.readFileSync(filePath, 'utf8');
            const action = OPTION_ACTION_MAP[operation];

            if (!operation || !action) {
                return res.status(400).json({ error: 'Pass valid operation' })
            }

            const result = action(data, options);
            if (result.error) {
                return res.status(400).json({ error: result.error })
            }
            const taskRepository = new TaskRepository({ dataSource: this.AppDataSource })

            const taskResponse = await taskRepository.saveTask({
                operation: operation,
                options: options ? JSON.stringify(options) : "",
                result: JSON.stringify({ result })
            })

            return res.status(200).json({ id: taskResponse.raw[0].id })
        } catch (error) {
            //@ts-ignore
            res.status(500).json({ error: error?.message || 'Internal Server Error' })
        }


    }

    fileResulstsController = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;
            const taskRepository = new TaskRepository({ dataSource: this.AppDataSource })
            const task = await taskRepository.getTaskById(parseInt(taskId))
            if (!task) {
                return res.status(400).json({ error: 'Task not found' });
            }
            res.status(200).json({ result: task })
        } catch (error) {
            //@ts-ignore
            res.status(500).json({ error: error?.message || 'Internal Server Error' })
        }
    }


}

export default TextFileControllers;