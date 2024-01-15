import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("files")
  class FilesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name:'file_name'})
    fileName: string

    @Column({name:'file_path'})
    filePath: string

    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at: Date;
}

export default FilesEntity