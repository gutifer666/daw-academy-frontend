import { ContentMakerCommand } from '../../../../app/content/application/content-maker/content-maker.command';

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
        expect(() => new ContentMakerCommand(path)).toThrow('Content path is required');
      });

      it('should throw error when path is only whitespace', () => {
        // Arrange
        const path = '   ';

        // Act & Assert
        expect(() => new ContentMakerCommand(path)).toThrow('Content path is required');
      });

      it('should throw error when path is undefined', () => {
        // Arrange
        const path = undefined as any;

        // Act & Assert
        expect(() => new ContentMakerCommand(path)).toThrow('Content path is required');
      });

      it('should throw error when path is null', () => {
        // Arrange
        const path = null as any;

        // Act & Assert
        expect(() => new ContentMakerCommand(path)).toThrow('Content path is required');
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

  describe('immutability', () => {
    it('should have readonly properties that cannot be modified', () => {
      // Arrange
      const path = 'programacion/ut1';
      const command = new ContentMakerCommand(path);

      // Act & Assert
      expect(() => {
        (command as any).path = 'modified-path';
      }).toThrow();

      expect(() => {
        (command as any).sanitize = false;
      }).toThrow();
    });
  });
});
