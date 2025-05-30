import { ContentPath } from './content-path';
import { ContentSource } from './content-source';

/**
 * Repository interface for content source resolution
 * This interface defines the contract for retrieving content sources
 * based on content paths, allowing for different implementations
 */
export interface ContentRepository {
  /**
   * Resolves a content path to a content source URL
   * @param contentPath The path to resolve
   * @returns Promise resolving to a ContentSource
   * @throws Error if the content cannot be resolved
   */
  resolveContentSource(contentPath: ContentPath): Promise<ContentSource>;

  /**
   * Checks if a content path is supported by this repository
   * @param contentPath The path to check
   * @returns Promise resolving to true if supported, false otherwise
   */
  isSupported(contentPath: ContentPath): Promise<boolean>;
}
