import request from 'supertest';
import { Response, Request } from 'express';
import { AppDataSource } from '../db';
import FileRepository from '../db/repositories/filesRepository';
import {textFileControllers} from './textFileControllers';

jest.mock('../db'); // Mock AppDataSource
jest.mock('../db/repositories/filesRepository'); // Mock FileRepository

describe('uploadFileController', () => {
    it('uploads a file and returns the file ID', async () => {
        const mockFile = {
            originalname: Date.now() + "-" +'test-file.txt',
            path: '/src/uploads/test-file.txt',
        };

        const mockFileRepository = {
            saveFile: jest.fn().mockResolvedValue({
                raw: [{ id: 'generated-id' }],
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
        expect(mockResponse.json).toHaveBeenCalledWith({ id: 'generated-id' });
    });

})