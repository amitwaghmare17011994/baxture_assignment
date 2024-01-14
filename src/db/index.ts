import FilesEntity from '@entities/Files'
import TasksEntity from '@entities/Tasks'
import {DataSource} from 'typeorm'
  
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    //@ts-ignore
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [FilesEntity,TasksEntity],
    subscribers: [],
    migrations: [],
})

export default AppDataSource