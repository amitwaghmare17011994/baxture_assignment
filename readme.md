# Text File Analyzer (Express, TypeOrm, Jest, Multer, PostgreSQL)


  ![TextAnalyzer drawio](https://github.com/amitwaghmare17011994/baxture_assignment/assets/38164439/6d231cfa-f2fd-4bd8-bd33-be263b2dbb71)
 






## Database Configuration
- DATABASE=PostgreSQL
- DB_HOST=localhost
- DB_PORT=5432
- DB_USERNAME=root
- DB_PASSWORD=root
- DB_NAME=baxture_assignment
- PORT=3000

## ORM
- TypeOrm

## Installation
- cd baxture_assignment
- npm i

## Start Server
- npm run dev

## Run Tests With Coverage
- npm run test -- --coverage

## API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /upload | To upload text file (Form Data field name ="file" )|
| POST | /analyze/:fileId | To perform operation on text content {operation:'countWords' | 'countUniqueWords' | 'findTopKWords',options:{k:number} }|
| GET | /results/:taskId | To retrieve result using taskId |
 


## Controllers

- [TextFileAnalyzeControllers](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/controllers/TextFileAnalyzeControllers.ts)

## Repositories

- [FilesRepository](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/repositories/FilesRepository.ts)

- [TasksRepository](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/repositories/TasksRepository.ts)

## Entities

- [FilesEntity](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/entities/Files.ts)

- [TasksEntity](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/entities/Tasks.ts)



