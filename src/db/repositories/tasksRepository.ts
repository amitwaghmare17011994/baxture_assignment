import { DataSource, Repository } from 'typeorm';
import TasksEntity from '../entities/tasks';

interface TaskRepositoryProps {
    dataSource: DataSource
}

class TaskRepository {

    tasksRepository: Repository<any>;

    constructor(props: TaskRepositoryProps) {
        this.tasksRepository = props.dataSource.getRepository(TasksEntity)
    }

    async get() {
        const tasks = await this.tasksRepository.find();
        return tasks;
    }
    
    async saveTask(task:TaskPayload){
        const res=await this.tasksRepository.insert(task);
        return res;
    }

    async getTaskById(id:number){
        const res=await this.tasksRepository.findOneBy({id:id});
        return res;
    }

}

export default TaskRepository