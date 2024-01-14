import { Entity, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import FilesEntity from '../entities/files';

interface FileRepositoryProps {
    dataSource: DataSource
}

class FileRepository {

    filesRepository: Repository<any>;

    constructor(props: FileRepositoryProps) {
        this.filesRepository = props.dataSource.getRepository(FilesEntity)
    }

    async getAllFiles() {
        const files = await this.filesRepository.find();
        return files;
    }
    
    async saveFile(file:FilePayload){
        const res=await this.filesRepository.insert(file);
        return res;
    }

}

export default FileRepository