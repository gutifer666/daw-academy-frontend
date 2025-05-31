import { ContentRepository } from '../../domain';
import { ContentPath } from '../../domain';
import { ContentSource } from '../../domain';

/**
 * Mock implementation of ContentRepository for testing and development
 * This demonstrates how easy it is to swap implementations in hexagonal architecture
 */
export class MockContentRepository implements ContentRepository {
  private readonly mockData: Map<string, string> = new Map([
    ['programacion/1', 'https://mock.example.com/programacion/ut1'],
    ['programacion/2', 'https://mock.example.com/programacion/ut2'],
    ['sistemas-informaticos/1', 'https://mock.example.com/sistemas-informaticos/ut1'],
    ['bases-de-datos/1', 'https://mock.example.com/bases-de-datos/ut1'],
  ]);

  async resolveContentSource(contentPath: ContentPath): Promise<ContentSource> {
    const key = `${contentPath.subject}/${contentPath.unit}`;
    const url = this.mockData.get(key);

    if (!url) {
      throw new Error(`Mock content not found for path: ${contentPath.originalPath}`);
    }

    return new ContentSource(url);
  }

  async isSupported(contentPath: ContentPath): Promise<boolean> {
    const key = `${contentPath.subject}/${contentPath.unit}`;
    return this.mockData.has(key);
  }

  /**
   * Add mock data for testing
   */
  addMockContent(subject: string, unit: string, url: string): void {
    const key = `${subject}/${unit}`;
    this.mockData.set(key, url);
  }

  /**
   * Clear all mock data
   */
  clearMockData(): void {
    this.mockData.clear();
  }
}
