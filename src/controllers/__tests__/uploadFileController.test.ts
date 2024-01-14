import { Response, Request } from 'express';
import TextFileControllers from '@controllers/TextFileAnalyzeControllers';
import AppDataSource from '@db/index';

import FileRepository from '@repositories/FilesRepository';
 
jest.mock('@db/index'); // Mock AppDataSource
jest.mock('@repositories/FilesRepository'); // Mock FileRepository
   
const textFileControllers = new TextFileControllers({AppDataSource:AppDataSource});

describe('uploadFileController', () => {
    it('uploads a file and returns the file ID', async () => {
        const mockFile = {
            originalname: Date.now() + "-" + 'test-file.txt',
            path: '/src/uploads/test-file.txt',
        };
        const randomId = Math.random();
        const mockFileRepository = {
            saveFile: jest.fn().mockResolvedValue({
                raw: [{ id: randomId }],
            }),
        };

        // @ts-ignore
        FileRepository.mockImplementation(() => mockFileRepository);

        const mockRequest = {
            file: mockFile,
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        await textFileControllers.uploadFileController(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: randomId });
    });


    it('handles no file uploaded', async () => {
        const mockRequest = {
            file: undefined,
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        await textFileControllers.uploadFileController(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No file uploaded' });
    });
    it('handles 500 internal server error',async ()=>{
        const mockFile = {
            originalname: Date.now() + "-" + 'test-file.txt',
            path: '/src/uploads/test-file.txt',
        };

        const mockRequest = {
            file: mockFile,
        } as unknown as Request;

        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        const mockFileRepository = {
            saveFile: jest.fn().mockImplementation(()=>{
                throw new Error('DB error');
            })
             
        };

        // @ts-ignore
        FileRepository.mockImplementation(() => mockFileRepository);

        await textFileControllers.uploadFileController(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({error:'DB error'})

    })
})