import { ContentMakerResult } from '../../../../app/content/application/content-maker/content-maker.result';

describe('ContentMakerResult', () => {
  describe('constructor', () => {
    describe('when creating with all parameters', () => {
      it('should create result with all properties set', () => {
        // Arrange
        const sourceUrl = 'https://example.com/content';
        const sanitizedUrl = 'sanitized-url-object';
        const isValid = true;
        const errorMessage = undefined;

        // Act
        const result = new ContentMakerResult(sourceUrl, sanitizedUrl, isValid, errorMessage);

        // Assert
        expect(result.sourceUrl).toBe(sourceUrl);
        expect(result.sanitizedUrl).toBe(sanitizedUrl);
        expect(result.isValid).toBe(isValid);
        expect(result.errorMessage).toBe(errorMessage);
      });

      it('should create result with error message', () => {
        // Arrange
        const sourceUrl = '';
        const sanitizedUrl = undefined;
        const isValid = false;
        const errorMessage = 'Content not found';

        // Act
        const result = new ContentMakerResult(sourceUrl, sanitizedUrl, isValid, errorMessage);

        // Assert
        expect(result.sourceUrl).toBe(sourceUrl);
        expect(result.sanitizedUrl).toBe(sanitizedUrl);
        expect(result.isValid).toBe(isValid);
        expect(result.errorMessage).toBe(errorMessage);
      });
    });

    describe('when creating with minimal parameters', () => {
      it('should create result with default values', () => {
        // Arrange
        const sourceUrl = 'https://example.com/content';

        // Act
        const result = new ContentMakerResult(sourceUrl);

        // Assert
        expect(result.sourceUrl).toBe(sourceUrl);
        expect(result.sanitizedUrl).toBeUndefined();
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBeUndefined();
      });
    });
  });

  describe('static factory methods', () => {
    describe('success', () => {
      it('should create successful result with source URL only', () => {
        // Arrange
        const sourceUrl = 'https://example.com/content';

        // Act
        const result = ContentMakerResult.success(sourceUrl);

        // Assert
        expect(result.sourceUrl).toBe(sourceUrl);
        expect(result.sanitizedUrl).toBeUndefined();
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBeUndefined();
        expect(result.isSuccess).toBe(true);
        expect(result.isFailure).toBe(false);
      });

      it('should create successful result with source URL and sanitized URL', () => {
        // Arrange
        const sourceUrl = 'https://example.com/content';
        const sanitizedUrl = 'sanitized-url-object';

        // Act
        const result = ContentMakerResult.success(sourceUrl, sanitizedUrl);

        // Assert
        expect(result.sourceUrl).toBe(sourceUrl);
        expect(result.sanitizedUrl).toBe(sanitizedUrl);
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBeUndefined();
        expect(result.isSuccess).toBe(true);
        expect(result.isFailure).toBe(false);
      });

      it('should create successful result with empty source URL', () => {
        // Arrange
        const sourceUrl = '';

        // Act
        const result = ContentMakerResult.success(sourceUrl);

        // Assert
        expect(result.sourceUrl).toBe(sourceUrl);
        expect(result.isValid).toBe(true);
        expect(result.isSuccess).toBe(true);
        expect(result.isFailure).toBe(false);
      });
    });

    describe('failure', () => {
      it('should create failure result with error message', () => {
        // Arrange
        const errorMessage = 'Content not found';

        // Act
        const result = ContentMakerResult.failure(errorMessage);

        // Assert
        expect(result.sourceUrl).toBe('');
        expect(result.sanitizedUrl).toBeUndefined();
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe(errorMessage);
        expect(result.isSuccess).toBe(false);
        expect(result.isFailure).toBe(true);
      });

      it('should create failure result with empty error message', () => {
        // Arrange
        const errorMessage = '';

        // Act
        const result = ContentMakerResult.failure(errorMessage);

        // Assert
        expect(result.sourceUrl).toBe('');
        expect(result.errorMessage).toBe(errorMessage);
        expect(result.isValid).toBe(false);
        expect(result.isSuccess).toBe(false);
        expect(result.isFailure).toBe(true);
      });
    });
  });

  describe('computed properties', () => {
    describe('isSuccess', () => {
      it('should return true when isValid is true and no error message', () => {
        // Arrange & Act
        const result = new ContentMakerResult('url', undefined, true, undefined);

        // Assert
        expect(result.isSuccess).toBe(true);
      });

      it('should return false when isValid is false', () => {
        // Arrange & Act
        const result = new ContentMakerResult('url', undefined, false, undefined);

        // Assert
        expect(result.isSuccess).toBe(false);
      });

      it('should return false when error message is present even if isValid is true', () => {
        // Arrange & Act
        const result = new ContentMakerResult('url', undefined, true, 'Some error');

        // Assert
        expect(result.isSuccess).toBe(false);
      });
    });

    describe('isFailure', () => {
      it('should return false when result is successful', () => {
        // Arrange & Act
        const result = ContentMakerResult.success('url');

        // Assert
        expect(result.isFailure).toBe(false);
      });

      it('should return true when result is failure', () => {
        // Arrange & Act
        const result = ContentMakerResult.failure('error');

        // Assert
        expect(result.isFailure).toBe(true);
      });

      it('should be opposite of isSuccess', () => {
        // Arrange
        const successResult = ContentMakerResult.success('url');
        const failureResult = ContentMakerResult.failure('error');

        // Act & Assert
        expect(successResult.isFailure).toBe(!successResult.isSuccess);
        expect(failureResult.isFailure).toBe(!failureResult.isSuccess);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle null sanitized URL', () => {
      // Arrange & Act
      const result = new ContentMakerResult('url', null);

      // Assert
      expect(result.sanitizedUrl).toBeNull();
      expect(result.isSuccess).toBe(true);
    });

    it('should handle undefined error message explicitly', () => {
      // Arrange & Act
      const result = new ContentMakerResult('url', undefined, true, undefined);

      // Assert
      expect(result.errorMessage).toBeUndefined();
      expect(result.isSuccess).toBe(true);
    });
  });
});
