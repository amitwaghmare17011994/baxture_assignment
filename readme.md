# Text File Analyzer (Express, TypeScript, TypeOrm, Jest, Multer, PostgreSQL)


 
<p align="center"> 
<img src="https://github.com/amitwaghmare17011994/baxture_assignment/assets/38164439/7cd1d521-b77b-4298-8aa5-f137b401fbd0"/>
</p>

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

<img width="695" alt="Screenshot 2024-01-15 at 11 24 30 AM" src="https://github.com/amitwaghmare17011994/baxture_assignment/assets/38164439/a592ca9c-4fc6-4977-a9f0-c126d1301faf">





## API Endpoints
| Method | Endpoint | Action | Parameters/Body/Form
| ------ | --- | --- | ------------------------------- |
| POST | /upload | To upload text file   | Form Data field name = "file" 
| POST | /analyze/:fileId | To perform operation on text content | operation = countWords / countUniqueWords / findTopKWords  . options = {k:number}
| GET | /results/:taskId | To retrieve result using taskId | taskId
 


## Controllers

- [TextFileAnalyzeControllers](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/controllers/TextFileAnalyzeControllers.ts)

## Repositories

- [FilesRepository](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/repositories/FilesRepository.ts)

- [TasksRepository](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/repositories/TasksRepository.ts)

## Entities

- [FilesEntity](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/entities/Files.ts)

- [TasksEntity](https://github.com/amitwaghmare17011994/baxture_assignment/blob/main/src/entities/Tasks.ts)



