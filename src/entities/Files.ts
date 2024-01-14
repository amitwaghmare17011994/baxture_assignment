import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("files")
  class FilesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name:'file_name'})
    fileName: string

    @Column({name:'file_path'})
    filePath: string
 
}

export default FilesEntity