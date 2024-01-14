import { Response, Request } from 'express';
import FileRepository from '../../db/repositories/filesRepository';
import TaskRepository from '../../db/repositories/tasksRepository';

import { textFileControllers } from '../textFileControllers';
jest.mock('../../db'); // Mock AppDataSource
jest.mock('../../db/repositories/filesRepository'); // Mock FileRepository
jest.mock('../../db/repositories/tasksRepository'); // Mock FileRepository

describe('analyzeFileController', () => {

    it('returns error with 400 code file not found', async () => {
        const mockRequest = {
            params: { fileId: '1' },
            body: {}
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        const mockFileRepository = {
            getFileById: jest.fn().mockResolvedValue(null),
        };

        // @ts-ignore
        FileRepository.mockImplementation(() => mockFileRepository);
        await textFileControllers.analyzeFileController(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'File not found' });

    })


    it('returns error with 400 code and message Pass valid operation', async () => {
        const mockRequest = {
            params: { fileId: '1' },
            body: {}
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        const mockFileRepository = {
            getFileById: jest.fn().mockResolvedValue({
                filePath: 'src/sample.txt'
            }),
        };
        //@ts-ignore
        FileRepository.mockImplementation(() => mockFileRepository);

        await textFileControllers.analyzeFileController(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Pass valid operation' });

    })

    it("performs operation countWords and returns taskId", async () => {
        const mockRequest = {
            params: { fileId: '1' },
            body: { operation: "countWords" }
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        const mockFileRepository = {
            getFileById: jest.fn().mockResolvedValue({
                filePath: 'src/sample.txt'
            }),
        };
        const randomId = Math.random();
        const mockTaskRepository = {
            saveTask: jest.fn().mockResolvedValue({
                raw: [{ id: randomId }],
            })
        }
        //@ts-ignore
        FileRepository.mockImplementation(() => mockFileRepository);
        //@ts-ignore
        TaskRepository.mockImplementation(() => mockTaskRepository)

        await textFileControllers.analyzeFileController(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: randomId });

    })


})