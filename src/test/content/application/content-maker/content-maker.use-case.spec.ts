import { ContentMakerUseCase } from '../../../../app/content/application/content-maker/content-maker.use-case';
import { ContentMakerCommand } from '../../../../app/content/application/content-maker/content-maker.command';
import { ContentMakerResult } from '../../../../app/content/application/content-maker/content-maker.result';
import { ContentMakerService } from '../../../../app/content/domain/content-maker.service';
import { ContentSource } from '../../../../app/content/domain/content-source';

describe('ContentMakerUseCase', () => {
  let useCase: ContentMakerUseCase;
  let mockContentMakerService: jasmine.SpyObj<ContentMakerService>;
  let mockUrlSanitizer: jasmine.Spy;

  beforeEach(() => {
    // Create spy object for ContentMakerService
    mockContentMakerService = jasmine.createSpyObj('ContentMakerService', [
      'createContentSource',
      'validatePath'
    ]);

    // Create spy for URL sanitizer function
    mockUrlSanitizer = jasmine.createSpy('urlSanitizer');

    // Create use case instance with mocked dependencies
    useCase = new ContentMakerUseCase(mockContentMakerService, mockUrlSanitizer);
  });

  afterEach(() => {
    // Reset all spies after each test
    mockContentMakerService.createContentSource.calls.reset();
    mockContentMakerService.validatePath.calls.reset();
    mockUrlSanitizer.calls.reset();
  });

  describe('constructor', () => {
    it('should create use case with content maker service only', () => {
      // Arrange & Act
      const useCaseWithoutSanitizer = new ContentMakerUseCase(mockContentMakerService);

      // Assert
      expect(useCaseWithoutSanitizer).toBeDefined();
      expect(useCaseWithoutSanitizer).toBeInstanceOf(ContentMakerUseCase);
    });

    it('should create use case with content maker service and sanitizer', () => {
      // Arrange & Act
      const useCaseWithSanitizer = new ContentMakerUseCase(mockContentMakerService, mockUrlSanitizer);

      // Assert
      expect(useCaseWithSanitizer).toBeDefined();
      expect(useCaseWithSanitizer).toBeInstanceOf(ContentMakerUseCase);
    });
  });

  describe('execute', () => {
    describe('successful execution scenarios', () => {
      it('should return success result when content source is created successfully with sanitization', async () => {
        // Arrange
        const testUrl = 'https://example.com/content';
        const sanitizedUrl = 'sanitized-url-object';
        const contentSource = new ContentSource(testUrl);
        const command = new ContentMakerCommand('programacion/ut1', true);

        mockContentMakerService.createContentSource.and.returnValue(Promise.resolve(contentSource));
        mockUrlSanitizer.and.returnValue(sanitizedUrl);

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result).toBeInstanceOf(ContentMakerResult);
        expect(result.isSuccess).toBe(true);
        expect(result.isFailure).toBe(false);
        expect(result.sourceUrl).toBe(testUrl);
        expect(result.sanitizedUrl).toBe(sanitizedUrl);
        expect(result.errorMessage).toBeUndefined();

        expect(mockContentMakerService.createContentSource).toHaveBeenCalledWith('programacion/ut1');
        expect(mockContentMakerService.createContentSource).toHaveBeenCalledTimes(1);
        expect(mockUrlSanitizer).toHaveBeenCalledWith(testUrl);
        expect(mockUrlSanitizer).toHaveBeenCalledTimes(1);
      });

      it('should return success result without sanitization when sanitize is false', async () => {
        // Arrange
        const testUrl = 'https://example.com/content';
        const contentSource = new ContentSource(testUrl);
        const command = new ContentMakerCommand('sistemas-informaticos/ut5', false);

        mockContentMakerService.createContentSource.and.returnValue(Promise.resolve(contentSource));

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.sourceUrl).toBe(testUrl);
        expect(result.sanitizedUrl).toBeUndefined();
        expect(result.errorMessage).toBeUndefined();

        expect(mockContentMakerService.createContentSource).toHaveBeenCalledWith('sistemas-informaticos/ut5');
        expect(mockContentMakerService.createContentSource).toHaveBeenCalledTimes(1);
        expect(mockUrlSanitizer).not.toHaveBeenCalled();
      });

      it('should return success result without sanitization when no sanitizer is provided', async () => {
        // Arrange
        const testUrl = 'https://example.com/content';
        const contentSource = new ContentSource(testUrl);
        const command = new ContentMakerCommand('bases-de-datos/ut3', true);
        const useCaseWithoutSanitizer = new ContentMakerUseCase(mockContentMakerService);

        mockContentMakerService.createContentSource.and.returnValue(Promise.resolve(contentSource));

        // Act
        const result = await useCaseWithoutSanitizer.execute(command);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.sourceUrl).toBe(testUrl);
        expect(result.sanitizedUrl).toBeUndefined();
        expect(result.errorMessage).toBeUndefined();

        expect(mockContentMakerService.createContentSource).toHaveBeenCalledWith('bases-de-datos/ut3');
        expect(mockUrlSanitizer).not.toHaveBeenCalled();
      });

      it('should handle complex path with special characters', async () => {
        // Arrange
        const testUrl = 'https://example.com/desarrollo-web-en-entorno-cliente';
        const sanitizedUrl = 'sanitized-complex-url';
        const contentSource = new ContentSource(testUrl);
        const command = new ContentMakerCommand('desarrollo-web-en-entorno-cliente/ut2', true);

        mockContentMakerService.createContentSource.and.returnValue(Promise.resolve(contentSource));
        mockUrlSanitizer.and.returnValue(sanitizedUrl);

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.sourceUrl).toBe(testUrl);
        expect(result.sanitizedUrl).toBe(sanitizedUrl);

        expect(mockContentMakerService.createContentSource).toHaveBeenCalledWith('desarrollo-web-en-entorno-cliente/ut2');
      });
    });

    describe('error handling scenarios', () => {
      it('should return failure result when ContentMakerService throws Error', async () => {
        // Arrange
        const errorMessage = 'Content not found';
        const command = new ContentMakerCommand('invalid/path');

        mockContentMakerService.createContentSource.and.returnValue(Promise.reject(new Error(errorMessage)));

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.isSuccess).toBe(false);
        expect(result.sourceUrl).toBe('');
        expect(result.sanitizedUrl).toBeUndefined();
        expect(result.errorMessage).toBe(errorMessage);

        expect(mockContentMakerService.createContentSource).toHaveBeenCalledWith('invalid/path');
        expect(mockContentMakerService.createContentSource).toHaveBeenCalledTimes(1);
        expect(mockUrlSanitizer).not.toHaveBeenCalled();
      });

      it('should return failure result when ContentMakerService throws non-Error object', async () => {
        // Arrange
        const command = new ContentMakerCommand('invalid/path');

        mockContentMakerService.createContentSource.and.returnValue(Promise.reject('String error'));

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.errorMessage).toBe('Unknown error occurred');
        expect(result.sourceUrl).toBe('');

        expect(mockContentMakerService.createContentSource).toHaveBeenCalledWith('invalid/path');
      });

      it('should return failure result when ContentMakerService throws undefined', async () => {
        // Arrange
        const command = new ContentMakerCommand('invalid/path');

        mockContentMakerService.createContentSource.and.returnValue(Promise.reject(undefined));

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.errorMessage).toBe('Unknown error occurred');
        expect(result.sourceUrl).toBe('');
      });

      it('should handle sanitizer throwing error gracefully', async () => {
        // Arrange
        const testUrl = 'https://example.com/content';
        const contentSource = new ContentSource(testUrl);
        const command = new ContentMakerCommand('programacion/ut1', true);

        mockContentMakerService.createContentSource.and.returnValue(Promise.resolve(contentSource));
        mockUrlSanitizer.and.throwError('Sanitizer error');

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.errorMessage).toBe('Sanitizer error');
        expect(result.sourceUrl).toBe('');

        expect(mockContentMakerService.createContentSource).toHaveBeenCalledWith('programacion/ut1');
        expect(mockUrlSanitizer).toHaveBeenCalledWith(testUrl);
      });

      it('should handle ContentPath validation errors', async () => {
        // Arrange
        const command = new ContentMakerCommand('invalid-format');

        mockContentMakerService.createContentSource.and.returnValue(
          Promise.reject(new Error('Invalid path format. Expected format: category/unit'))
        );

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isFailure).toBe(true);
        expect(result.errorMessage).toBe('Invalid path format. Expected format: category/unit');
        expect(result.sourceUrl).toBe('');
      });
    });

    describe('edge cases', () => {
      it('should handle empty URL from content source', async () => {
        // Arrange
        const testUrl = '';
        const sanitizedUrl = 'sanitized-empty-url';
        const contentSource = new ContentSource('http://example.com'); // Valid URL for ContentSource creation
        const command = new ContentMakerCommand('programacion/ut1', true);

        // Mock the url getter to return empty string
        spyOnProperty(contentSource, 'url', 'get').and.returnValue(testUrl);
        mockContentMakerService.createContentSource.and.returnValue(Promise.resolve(contentSource));
        mockUrlSanitizer.and.returnValue(sanitizedUrl);

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.sourceUrl).toBe(testUrl);
        expect(result.sanitizedUrl).toBe(sanitizedUrl);

        expect(mockUrlSanitizer).toHaveBeenCalledWith(testUrl);
      });

      it('should handle null return from sanitizer', async () => {
        // Arrange
        const testUrl = 'https://example.com/content';
        const contentSource = new ContentSource(testUrl);
        const command = new ContentMakerCommand('programacion/ut1', true);

        mockContentMakerService.createContentSource.and.returnValue(Promise.resolve(contentSource));
        mockUrlSanitizer.and.returnValue(null);

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isSuccess).toBe(true);
        expect(result.sourceUrl).toBe(testUrl);
        expect(result.sanitizedUrl).toBeNull();
      });
    });
  });

  describe('validatePath', () => {
    describe('successful validation scenarios', () => {
      it('should return true when ContentMakerService validates path successfully', async () => {
        // Arrange
        const path = 'programacion/ut1';
        mockContentMakerService.validatePath.and.returnValue(Promise.resolve(true));

        // Act
        const result = await useCase.validatePath(path);

        // Assert
        expect(result).toBe(true);
        expect(mockContentMakerService.validatePath).toHaveBeenCalledWith(path);
        expect(mockContentMakerService.validatePath).toHaveBeenCalledTimes(1);
      });

      it('should return false when ContentMakerService validation fails', async () => {
        // Arrange
        const path = 'invalid/path';
        mockContentMakerService.validatePath.and.returnValue(Promise.resolve(false));

        // Act
        const result = await useCase.validatePath(path);

        // Assert
        expect(result).toBe(false);
        expect(mockContentMakerService.validatePath).toHaveBeenCalledWith(path);
        expect(mockContentMakerService.validatePath).toHaveBeenCalledTimes(1);
      });

      it('should handle complex paths with special characters', async () => {
        // Arrange
        const path = 'desarrollo-web-en-entorno-servidor/ut5';
        mockContentMakerService.validatePath.and.returnValue(Promise.resolve(true));

        // Act
        const result = await useCase.validatePath(path);

        // Assert
        expect(result).toBe(true);
        expect(mockContentMakerService.validatePath).toHaveBeenCalledWith(path);
      });
    });

    describe('error handling scenarios', () => {
      it('should handle service throwing error during validation', async () => {
        // Arrange
        const path = 'problematic/path';
        mockContentMakerService.validatePath.and.returnValue(Promise.reject(new Error('Validation error')));

        // Act & Assert
        await expectAsync(useCase.validatePath(path)).toBeRejected();
        expect(mockContentMakerService.validatePath).toHaveBeenCalledWith(path);
      });

      it('should handle service returning undefined', async () => {
        // Arrange
        const path = 'undefined/path';
        mockContentMakerService.validatePath.and.returnValue(Promise.resolve(undefined as any));

        // Act
        const result = await useCase.validatePath(path);

        // Assert
        expect(result).toBeUndefined();
        expect(mockContentMakerService.validatePath).toHaveBeenCalledWith(path);
      });
    });

    describe('edge cases', () => {
      it('should handle empty path validation', async () => {
        // Arrange
        const path = '';
        mockContentMakerService.validatePath.and.returnValue(Promise.resolve(false));

        // Act
        const result = await useCase.validatePath(path);

        // Assert
        expect(result).toBe(false);
        expect(mockContentMakerService.validatePath).toHaveBeenCalledWith(path);
      });

      it('should handle path with only whitespace', async () => {
        // Arrange
        const path = '   ';
        mockContentMakerService.validatePath.and.returnValue(Promise.resolve(false));

        // Act
        const result = await useCase.validatePath(path);

        // Assert
        expect(result).toBe(false);
        expect(mockContentMakerService.validatePath).toHaveBeenCalledWith(path);
      });
    });
  });

  describe('integration scenarios', () => {
    it('should maintain state isolation between execute and validatePath calls', async () => {
      // Arrange
      const path = 'programacion/ut1';
      const testUrl = 'https://example.com/content';
      const contentSource = new ContentSource(testUrl);
      const command = new ContentMakerCommand(path, true);

      mockContentMakerService.createContentSource.and.returnValue(Promise.resolve(contentSource));
      mockContentMakerService.validatePath.and.returnValue(Promise.resolve(true));
      mockUrlSanitizer.and.returnValue('sanitized-url');

      // Act
      const executeResult = await useCase.execute(command);
      const validateResult = await useCase.validatePath(path);

      // Assert
      expect(executeResult.isSuccess).toBe(true);
      expect(validateResult).toBe(true);

      expect(mockContentMakerService.createContentSource).toHaveBeenCalledTimes(1);
      expect(mockContentMakerService.validatePath).toHaveBeenCalledTimes(1);
      expect(mockUrlSanitizer).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple consecutive calls correctly', async () => {
      // Arrange
      const paths = ['programacion/ut1', 'sistemas-informaticos/ut2', 'bases-de-datos/ut3'];
      mockContentMakerService.validatePath.and.returnValue(Promise.resolve(true));

      // Act
      const results = await Promise.all(paths.map(path => useCase.validatePath(path)));

      // Assert
      expect(results).toEqual([true, true, true]);
      expect(mockContentMakerService.validatePath).toHaveBeenCalledTimes(3);
      paths.forEach(path => {
        expect(mockContentMakerService.validatePath).toHaveBeenCalledWith(path);
      });
    });
  });
});
