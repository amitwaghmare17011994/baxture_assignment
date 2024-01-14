import { Response, Request } from 'express';
import TaskRepository from '../../db/repositories/tasksRepository';
import { textFileControllers } from '../textFileControllers';

jest.mock('../../db'); // Mock AppDataSource
jest.mock('../../db/repositories/tasksRepository'); // Mock FileRepository

describe('fileResulstsController', () => {
    it('returns error with 400 code Task not found', async () => {
        const mockRequest = {
            params: { taskId: '1' },
            body: {}
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        const mockTaskRepository = {
            getTaskById: jest.fn().mockResolvedValue(null),
        };

        // @ts-ignore
        TaskRepository.mockImplementation(() => mockTaskRepository);
        await textFileControllers.fileResulstsController(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Task not found' });
    })

    it('returns task object with 200 status code', async () => {
        const mockRequest = {
            params: { taskId: '1' },
            body: {}
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;
        const taskObj = {
            id: 1,
            operation: 'countWords',
            options: '',
            result: 11
        }
        const mockTaskRepository = {
            getTaskById: jest.fn().mockResolvedValue(taskObj),
        };

        // @ts-ignore
        TaskRepository.mockImplementation(() => mockTaskRepository);
        await textFileControllers.fileResulstsController(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ result: taskObj });
    })
})