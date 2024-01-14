import { Entity, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import FilesEntity from '../entities/Files';
 
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

    async getFileById(id:number){
        const res=await this.filesRepository.findOneBy({id:id});
        return res;
    }

}

export default FileRepository