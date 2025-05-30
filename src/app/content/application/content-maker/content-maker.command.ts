/**
 * Command object for content maker use case input
 */
export class ContentMakerCommand {
  constructor(
    public readonly path: string,
    public readonly sanitize: boolean = true
  ) {
    this.validateCommand();
  }

  private validateCommand(): void {
    if (!this.path || this.path.trim().length === 0) {
      throw new Error('Content path is required');
    }
  }
}
