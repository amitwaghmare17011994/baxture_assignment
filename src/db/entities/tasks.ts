import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("tasks")
  class TasksEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name:'operation'})
    operation: string

    @Column({name:'options'})
    options: string

    @Column({name:'result'})
    result: string


}

export default TasksEntity