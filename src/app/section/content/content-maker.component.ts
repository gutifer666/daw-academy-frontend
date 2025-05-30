import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// Application layer imports
import { ContentMakerUseCase } from '../../content/application/content-maker/content-maker.use-case';
import { ContentMakerCommand } from '../../content/application/content-maker/content-maker.command';
import { ContentMakerResult } from '../../content/application/content-maker/content-maker.result';

// Factory service import
import { ContentMakerFactory } from '../../content/content-maker-factory.service';

/**
 * Angular component for content creation using hexagonal architecture
 * This is the only layer where Angular-specific code is allowed
 */
@Component({
  selector: 'app-content-maker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-maker.component.html',
  styleUrl: './content-maker.component.css'
})
export class ContentMakerComponent implements OnInit {
  public source: SafeResourceUrl | undefined;
  public isLoading = false;
  public errorMessage: string | undefined;

  private contentMakerUseCase: ContentMakerUseCase;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentMakerFactory: ContentMakerFactory
  ) {
    // Use factory to create the use case with proper dependency injection
    this.contentMakerUseCase = this.contentMakerFactory.createWithHttpRepository();
  }

  async ngOnInit(): Promise<void> {
    await this.loadContent();
  }

  private async loadContent(): Promise<void> {
    try {
      this.isLoading = true;
      this.errorMessage = undefined;

      // Get the current URL path
      const currentUrl = this.router.url;
      const path = currentUrl.startsWith('/') ? currentUrl.substring(1) : currentUrl;

      if (!path) {
        this.errorMessage = 'No content path provided';
        return;
      }

      // Create command and execute use case
      const command = new ContentMakerCommand(path, true);
      const result = await this.contentMakerUseCase.execute(command);

      this.handleResult(result);
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error loading content:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private handleResult(result: ContentMakerResult): void {
    if (result.isSuccess) {
      this.source = result.sanitizedUrl;
      this.errorMessage = undefined;
    } else {
      this.errorMessage = result.errorMessage || 'Failed to load content';
      this.source = undefined;
    }
  }

  /**
   * Public method to reload content (useful for error recovery)
   */
  async reloadContent(): Promise<void> {
    await this.loadContent();
  }
}
