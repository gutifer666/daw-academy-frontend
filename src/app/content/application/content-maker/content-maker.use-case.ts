import { ContentMakerService } from '../../domain';
import { ContentMakerCommand } from './content-maker.command';
import { ContentMakerResult } from './content-maker.result';

/**
 * Use case for creating content sources
 * This class orchestrates the content creation flow without any framework dependencies
 */
export class ContentMakerUseCase {
  constructor(
    private readonly contentMakerService: ContentMakerService,
    private readonly urlSanitizer?: (url: string) => any // Optional sanitizer injection
  ) {}

  /**
   * Executes the content maker use case
   * @param command The command containing the input data
   * @returns Promise resolving to ContentMakerResult
   */
  async execute(command: ContentMakerCommand): Promise<ContentMakerResult> {
    try {
      // Use the domain service to create the content source
      const contentSource = await this.contentMakerService.createContentSource(command.path);

      // Get the URL from the content source
      const sourceUrl = contentSource.url;

      // Sanitize URL if sanitizer is provided and sanitization is requested
      let sanitizedUrl;
      if (command.sanitize && this.urlSanitizer) {
        sanitizedUrl = this.urlSanitizer(sourceUrl);
      }

      return ContentMakerResult.success(sourceUrl, sanitizedUrl);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return ContentMakerResult.failure(errorMessage);
    }
  }

  /**
   * Validates a path without creating content
   * @param path The path to validate
   * @returns Promise resolving to true if valid, false otherwise
   */
  async validatePath(path: string): Promise<boolean> {
    return await this.contentMakerService.validatePath(path);
  }
}
