import { DataSource, EntityRepository, Repository } from 'typeorm';

import TasksEntity from '@entities/Tasks';
import TaskRepository from '@repositories/TasksRepository';

jest.mock('typeorm', () => ({
    ...jest.requireActual('typeorm'),
    EntityRepository: jest.fn(),
    Repository: jest.fn(),
}));

describe('TaskRepository', () => {
    let mockDataSource: DataSource;
    let taskRepository: TaskRepository;
    let mockRepository: Repository<TasksEntity>;

    beforeEach(() => {
        mockRepository = {
            find: jest.fn(),
            insert: jest.fn(),
            findOneBy: jest.fn(),
        } as unknown as Repository<TasksEntity>;
        // @ts-ignore
        EntityRepository.mockImplementation(() => {
            return function (target: Function) {
                // @ts-ignore
                target.prototype.save = mockRepository.save;
                target.prototype.findOneBy = mockRepository.findOneBy;
            };
        });
        // @ts-ignore

        Repository.mockImplementation(() => mockRepository);

        mockDataSource = {
            getRepository: jest.fn().mockReturnValue(mockRepository),
        } as unknown as DataSource;

        taskRepository = new TaskRepository({ dataSource: mockDataSource } as any);
    });

    it('get should return tasks', async () => {
        const mockTasks = [{ id: 1, operation: 'countWords', options: '', result: 11 }];
        // @ts-ignore
        mockRepository.find.mockResolvedValueOnce(mockTasks);

        const result = await taskRepository.get();

        expect(result).toEqual(mockTasks);
        expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('saveTask should save a task', async () => {
        const mockTask = { id: 1, operation: 'countWords', options: '', result: 11 };
        const mockInsertResult = { raw: [{ id: 1 }] };
        // @ts-ignore

        mockRepository.insert.mockResolvedValueOnce(mockInsertResult);
        //@ts-ignore
        const result = await taskRepository.saveTask(mockTask);

        expect(result).toEqual(mockInsertResult);
        expect(mockRepository.insert).toHaveBeenCalledWith(mockTask);
    });

    it('getTaskById should return a task by ID', async () => {
        const taskId = 1;
        const mockTask = { id: taskId, operation: 'countWords', options: '', result: 11 };
        // @ts-ignore

        mockRepository.findOneBy.mockResolvedValueOnce(mockTask);

        const result = await taskRepository.getTaskById(taskId);

        expect(result).toEqual(mockTask);
        expect(mockRepository.findOneBy).toHaveBeenCalledWith({"id": 1});
    });
});