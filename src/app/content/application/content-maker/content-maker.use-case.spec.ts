import { ContentMakerUseCase } from './content-maker.use-case';
import { ContentMakerCommand } from './content-maker.command';
import { ContentMakerService } from '../../domain/content-maker.service';
import { ContentSource } from '../../domain/content-source';

describe('ContentMakerUseCase', () => {
  let useCase: ContentMakerUseCase;
  let mockContentMakerService: jest.Mocked<ContentMakerService>;
  let mockUrlSanitizer: jest.Mock;

  beforeEach(() => {
    mockContentMakerService = {
      createContentSource: jest.fn(),
      validatePath: jest.fn(),
    } as any;

    mockUrlSanitizer = jest.fn();
    
    useCase = new ContentMakerUseCase(mockContentMakerService, mockUrlSanitizer);
  });

  describe('execute', () => {
    it('should return success result when content source is created successfully', async () => {
      const testUrl = 'https://example.com/content';
      const sanitizedUrl = 'sanitized-url';
      const contentSource = new ContentSource(testUrl);
      
      mockContentMakerService.createContentSource.mockResolvedValue(contentSource);
      mockUrlSanitizer.mockReturnValue(sanitizedUrl);

      const command = new ContentMakerCommand('programacion/ut1', true);
      const result = await useCase.execute(command);

      expect(result.isSuccess).toBe(true);
      expect(result.sourceUrl).toBe(testUrl);
      expect(result.sanitizedUrl).toBe(sanitizedUrl);
      expect(mockContentMakerService.createContentSource).toHaveBeenCalledWith('programacion/ut1');
      expect(mockUrlSanitizer).toHaveBeenCalledWith(testUrl);
    });

    it('should return success result without sanitization when sanitize is false', async () => {
      const testUrl = 'https://example.com/content';
      const contentSource = new ContentSource(testUrl);
      
      mockContentMakerService.createContentSource.mockResolvedValue(contentSource);

      const command = new ContentMakerCommand('programacion/ut1', false);
      const result = await useCase.execute(command);

      expect(result.isSuccess).toBe(true);
      expect(result.sourceUrl).toBe(testUrl);
      expect(result.sanitizedUrl).toBeUndefined();
      expect(mockUrlSanitizer).not.toHaveBeenCalled();
    });

    it('should return failure result when service throws error', async () => {
      const errorMessage = 'Content not found';
      mockContentMakerService.createContentSource.mockRejectedValue(new Error(errorMessage));

      const command = new ContentMakerCommand('invalid/path');
      const result = await useCase.execute(command);

      expect(result.isFailure).toBe(true);
      expect(result.errorMessage).toBe(errorMessage);
      expect(result.sourceUrl).toBe('');
    });
  });

  describe('validatePath', () => {
    it('should return validation result from service', async () => {
      mockContentMakerService.validatePath.mockResolvedValue(true);

      const isValid = await useCase.validatePath('programacion/ut1');

      expect(isValid).toBe(true);
      expect(mockContentMakerService.validatePath).toHaveBeenCalledWith('programacion/ut1');
    });
  });
});
