import {DataSource} from 'typeorm'
import FilesEntity from './entities/files'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "baxture_assignment",
    synchronize: true,
    logging: true,
    entities: [FilesEntity],
    subscribers: [],
    migrations: [],
})
