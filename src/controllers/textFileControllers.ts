import { Request, Response } from "express"


const uploadFileController = (req: Request, res: Response) => {
    res.json({})
}

const analyzeFileController = (req: Request, res: Response) => {
    res.json({})
}

const fileResulstsController = (req: Request, res: Response) => {
    res.json({})
}

export const textFileControllers={
    uploadFileController, analyzeFileController, fileResulstsController
}