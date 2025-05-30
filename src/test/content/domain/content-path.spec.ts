import { ContentPath } from '../../../app/content/domain/content-path';

describe('ContentPath', () => {
  describe('constructor', () => {
    it('should create a valid ContentPath from a proper path', () => {
      const path = new ContentPath('programacion/ut1');

      expect(path.subject).toBe('programacion');
      expect(path.unit).toBe('1');
      expect(path.originalPath).toBe('programacion/ut1');
    });

    it('should handle paths with leading slash', () => {
      const path = new ContentPath('/sistemas-informaticos/ut5');

      expect(path.subject).toBe('sistemas-informaticos');
      expect(path.unit).toBe('5');
      expect(path.originalPath).toBe('/sistemas-informaticos/ut5');
    });

it('should throw error for empty path', () => {
  expect(() => new ContentPath('')).toThrowError('Path is undefined or empty');
});

it('should throw error for invalid path format', () => {
  expect(() => new ContentPath('invalid')).toThrowError('Invalid path format. Expected format: category/unit');
  expect(() => new ContentPath('too/many/segments')).toThrowError('Invalid path format. Expected format: category/unit');
});
  });

  describe('equals', () => {
    it('should return true for equal paths', () => {
      const path1 = new ContentPath('programacion/ut1');
      const path2 = new ContentPath('programacion/ut1');

      expect(path1.equals(path2)).toBe(true);
    });

    it('should return false for different paths', () => {
      const path1 = new ContentPath('programacion/ut1');
      const path2 = new ContentPath('programacion/ut2');

      expect(path1.equals(path2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the original path', () => {
      const originalPath = '/sistemas-informaticos/ut3';
      const path = new ContentPath(originalPath);

      expect(path.toString()).toBe(originalPath);
    });
  });
});
