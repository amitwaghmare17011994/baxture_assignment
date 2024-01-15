import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

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


    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at: Date;
}

export default TasksEntity