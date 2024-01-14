import { Response, Request } from 'express';
 
import TextFileControllers from '@controllers/TextFileAnalyzeControllers';
import AppDataSource  from '@db/index';
import FileRepository from '@repositories/FilesRepository';
import TaskRepository from '@repositories/TasksRepository';

jest.mock('@db/index'); // Mock AppDataSource
jest.mock('@repositories/FilesRepository'); // Mock FileRepository
jest.mock('@repositories/TasksRepository'); // Mock TaskRepository

const textFileControllers = new TextFileControllers({AppDataSource:AppDataSource});
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


    it('returns error with 400 code and message Please provide valid options', async () => {
        const mockRequest = {
            params: { fileId: '1' },
            body: { operation: 'findTopKWords' }
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
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Please provide valid options' });

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

    it('handles 500 internal server error', async () => {
        const mockRequest = {
            params: { fileId: '1' },
            body: { operation: "countWords" }
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        const mockFileRepository = {
            getFileById: jest.fn().mockImplementation(() => {
                throw new Error('DB error');
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
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'DB error' });

    })

})