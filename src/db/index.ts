import FilesEntity from '@entities/Files'
import TasksEntity from '@entities/Tasks'
import {DataSource} from 'typeorm'
  
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "baxture_assignment",
    synchronize: true,
    logging: true,
    entities: [FilesEntity,TasksEntity],
    subscribers: [],
    migrations: [],
})

export default AppDataSource