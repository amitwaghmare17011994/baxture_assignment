declare interface FilePayload {
    fileName: string,
    filePath: string
}

declare interface TaskPayload{
    operation:string,
    options:string,
    result:string
}

declare interface TopFreqOption{
    k:number
}