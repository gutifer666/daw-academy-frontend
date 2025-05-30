/**
 * Value object representing a content source URL
 */
export class ContentSource {
  private readonly _url: string;

  constructor(url: string) {
    this.validateUrl(url);
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  private validateUrl(url: string): void {
    if (!url || url.trim().length === 0) {
      throw new Error('Content source URL cannot be empty');
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      // If it's not a valid URL, check if it's a relative path
      if (!url.startsWith('/') && !url.includes('.')) {
        throw new Error('Invalid content source URL format');
      }
    }
  }

  equals(other: ContentSource): boolean {
    return this._url === other._url;
  }

  toString(): string {
    return this._url;
  }
}
