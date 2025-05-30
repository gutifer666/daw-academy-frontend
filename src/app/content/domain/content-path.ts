/**
 * Value object representing a content path with subject and unit
 */
export class ContentPath {
  private readonly _subject: string;
  private readonly _unit: string;
  private readonly _originalPath: string;

  constructor(path: string) {
    this.validatePath(path);
    this._originalPath = path;
    const { subject, unit } = this.parsePath(path);
    this._subject = subject;
    this._unit = unit;
  }

  get subject(): string {
    return this._subject;
  }

  get unit(): string {
    return this._unit;
  }

  get originalPath(): string {
    return this._originalPath;
  }

  private validatePath(path: string): void {
    if (!path || path.trim().length === 0) {
      throw new Error('Path is undefined or empty');
    }
  }

  private parsePath(path: string): { subject: string; unit: string } {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const parts = cleanPath.split('/');

    if (parts.length !== 2) {
      throw new Error('Invalid path format. Expected format: category/unit');
    }

    const subject = parts[0];
    const unit = parts[1].replace('ut', '');

    return { subject, unit };
  }

  equals(other: ContentPath): boolean {
    return this._originalPath === other._originalPath;
  }

  toString(): string {
    return this._originalPath;
  }
}
