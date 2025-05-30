import { ContentPath } from './content-path';
import { ContentSource } from './content-source';
import { ContentRepository } from './content-repository.interface';

/**
 * Domain service for content creation business logic
 * This service encapsulates the core business rules for content creation
 */
export class ContentMakerService {
  constructor(private readonly contentRepository: ContentRepository) {}

  /**
   * Creates content source from a given path
   * @param path The content path string
   * @returns Promise resolving to a ContentSource
   * @throws Error if path is invalid or content cannot be resolved
   */
  async createContentSource(path: string): Promise<ContentSource> {
    // Create and validate the content path
    const contentPath = new ContentPath(path);

    // Check if the repository supports this path
    const isSupported = await this.contentRepository.isSupported(contentPath);
    if (!isSupported) {
      throw new Error(`Content path '${path}' is not supported`);
    }

    // Resolve the content source
    return await this.contentRepository.resolveContentSource(contentPath);
  }

  /**
   * Validates if a path can be processed
   * @param path The path to validate
   * @returns Promise resolving to true if valid, false otherwise
   */
  async validatePath(path: string): Promise<boolean> {
    try {
      const contentPath = new ContentPath(path);
      return await this.contentRepository.isSupported(contentPath);
    } catch {
      return false;
    }
  }
}
