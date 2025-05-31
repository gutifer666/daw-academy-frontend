import { ContentMakerCommand } from '../../../../app/content/application/content-maker';

describe('ContentMakerCommand', () => {
  describe('constructor', () => {
    describe('when creating with valid parameters', () => {
      it('should create command with path and default sanitize value', () => {
        // Arrange
        const path = 'programacion/ut1';

        // Act
        const command = new ContentMakerCommand(path);

        // Assert
        expect(command.path).toBe(path);
        expect(command.sanitize).toBe(true);
      });

      it('should create command with path and explicit sanitize value true', () => {
        // Arrange
        const path = 'sistemas-informaticos/ut5';
        const sanitize = true;

        // Act
        const command = new ContentMakerCommand(path, sanitize);

        // Assert
        expect(command.path).toBe(path);
        expect(command.sanitize).toBe(sanitize);
      });

      it('should create command with path and explicit sanitize value false', () => {
        // Arrange
        const path = 'bases-de-datos/ut3';
        const sanitize = false;

        // Act
        const command = new ContentMakerCommand(path, sanitize);

        // Assert
        expect(command.path).toBe(path);
        expect(command.sanitize).toBe(sanitize);
      });

      it('should create command with complex path containing hyphens', () => {
        // Arrange
        const path = 'desarrollo-web-en-entorno-cliente/ut2';
        const sanitize = true;

        // Act
        const command = new ContentMakerCommand(path, sanitize);

        // Assert
        expect(command.path).toBe(path);
        expect(command.sanitize).toBe(sanitize);
      });
    });

    describe('when creating with invalid parameters', () => {
      it('should throw error when path is empty string', () => {
        // Arrange
        const path = '';

        // Act & Assert
        expect(() => new ContentMakerCommand(path)).toThrowError('Content path is required');
      });

      it('should throw error when path is only whitespace', () => {
        // Arrange
        const path = '   ';

        // Act & Assert
        expect(() => new ContentMakerCommand(path)).toThrowError('Content path is required');
      });

      it('should throw error when path is undefined', () => {
        // Arrange
        const path = undefined as any;

        // Act & Assert
        expect(() => new ContentMakerCommand(path)).toThrowError('Content path is required');
      });

      it('should throw error when path is null', () => {
        // Arrange
        const path = null as any;

        // Act & Assert
        expect(() => new ContentMakerCommand(path)).toThrowError('Content path is required');
      });

      it('should throw Error instance with correct message', () => {
        // Arrange
        const path = '';

        // Act & Assert
        try {
          new ContentMakerCommand(path);
          fail('Expected constructor to throw an error');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toBe('Content path is required');        }
      });

      it('should throw error when path contains only tabs and spaces', () => {
        // Arrange
        const path = '\t  \n  ';

        // Act & Assert
        expect(() => new ContentMakerCommand(path)).toThrowError('Content path is required');
      });
    });

    describe('edge cases', () => {
      it('should handle path with leading and trailing spaces', () => {
        // Arrange
        const path = '  programacion/ut1  ';

        // Act
        const command = new ContentMakerCommand(path);

        // Assert
        expect(command.path).toBe(path); // Should preserve original path as-is
        expect(command.sanitize).toBe(true);
      });

      it('should handle single character path segments', () => {
        // Arrange
        const path = 'a/b';

        // Act
        const command = new ContentMakerCommand(path);

        // Assert
        expect(command.path).toBe(path);
        expect(command.sanitize).toBe(true);
      });
    });
  });

  describe('property accessibility', () => {
    it('should have readonly properties that are accessible but not reassignable at compile time', () => {
      // Arrange
      const path = 'programacion/ut1';
      const sanitize = false;
      const command = new ContentMakerCommand(path, sanitize);

      // Act & Assert - Properties should be accessible
      expect(command.path).toBe(path);
      expect(command.sanitize).toBe(sanitize);

      // Note: TypeScript readonly properties are compile-time only
      // They don't throw runtime errors when modified, but TypeScript
      // compiler prevents modification at compile time
      expect(typeof command.path).toBe('string');
      expect(typeof command.sanitize).toBe('boolean');
    });

    it('should maintain property values after construction', () => {
      // Arrange
      const path = 'sistemas-informaticos/ut3';
      const sanitize = true;

      // Act
      const command = new ContentMakerCommand(path, sanitize);

      // Assert - Properties should remain unchanged
      expect(command.path).toBe(path);
      expect(command.sanitize).toBe(sanitize);

      // Verify properties are not undefined or null
      expect(command.path).toBeDefined();
      expect(command.sanitize).toBeDefined();
      expect(command.path).not.toBeNull();
      expect(command.sanitize).not.toBeNull();
    });
  });
});
