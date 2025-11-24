import { jest } from '@jest/globals';

export class PrismaClient {
  constructor() {
    return {
      item: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      review: {
        findMany: jest.fn(),
        aggregate: jest.fn(),
      },
      $disconnect: jest.fn(),
    };
  }
}