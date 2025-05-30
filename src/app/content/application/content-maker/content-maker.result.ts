/**
 * Result object for content maker use case output
 */
export class ContentMakerResult {
  constructor(
    public readonly sourceUrl: string,
    public readonly sanitizedUrl?: any, // SafeResourceUrl from Angular
    public readonly isValid: boolean = true,
    public readonly errorMessage?: string
  ) {}

  static success(sourceUrl: string, sanitizedUrl?: any): ContentMakerResult {
    return new ContentMakerResult(sourceUrl, sanitizedUrl, true);
  }

  static failure(errorMessage: string): ContentMakerResult {
    return new ContentMakerResult('', undefined, false, errorMessage);
  }

  get isSuccess(): boolean {
    return this.isValid && !this.errorMessage;
  }

  get isFailure(): boolean {
    return !this.isSuccess;
  }
}
