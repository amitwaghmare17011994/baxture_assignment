import { DataSource, EntityRepository, Repository } from 'typeorm';

import FilesEntity from '@entities/Files';
import FileRepository from '@repositories/FilesRepository';

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  EntityRepository: jest.fn(),
  Repository: jest.fn(),
}));

describe('FileRepository', () => {
  let mockDataSource: DataSource;
  let fileRepository: FileRepository;
  let mockRepository: Repository<FilesEntity>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
      insert: jest.fn(),
      findOneBy: jest.fn(),
    } as unknown as Repository<FilesEntity>;

    //@ts-ignore
    EntityRepository.mockImplementation(() => {
      return function(target: Function) {
        // @ts-ignore
        target.prototype.save = mockRepository.save;
        target.prototype.findOneBy = mockRepository.findOneBy;
      };
    });

    //@ts-ignore
    Repository.mockImplementation(() => mockRepository);

    mockDataSource = {
      getRepository: jest.fn().mockReturnValue(mockRepository),
    } as unknown as DataSource;

    fileRepository = new FileRepository({ dataSource: mockDataSource } as any);
  });

  it('getAllFiles should return files', async () => {
    const mockFiles = [{ id: 1, fileName: 'test-file.txt', filePath: '/path/to/test-file.txt' }];
    //@ts-ignore
    mockRepository.find.mockResolvedValueOnce(mockFiles);

    const result = await fileRepository.getAllFiles();

    expect(result).toEqual(mockFiles);
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  it('saveFile should save a file', async () => {
    const mockFile = { fileName: 'test-file.txt', filePath: '/path/to/test-file.txt' };
    const mockInsertResult = { raw: [{ id: 1 }] };
    //@ts-ignore
    mockRepository.insert.mockResolvedValueOnce(mockInsertResult);

    const result = await fileRepository.saveFile(mockFile);

    expect(result).toEqual(mockInsertResult);
    expect(mockRepository.insert).toHaveBeenCalledWith(mockFile);
  });

  it('getFileById should return a file by ID', async () => {
    const fileId = 1;
    const mockFile = { id: fileId, fileName: 'test-file.txt', filePath: '/path/to/test-file.txt' };
    //@ts-ignore
    mockRepository.findOneBy.mockResolvedValueOnce(mockFile);

    const result = await fileRepository.getFileById(fileId);

    expect(result).toEqual(mockFile);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({"id": 1});
  });
});