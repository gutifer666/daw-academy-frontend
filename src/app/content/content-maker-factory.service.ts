import { Injectable } from '@angular/core';
import { ContentMakerUseCase } from './application/content-maker/content-maker.use-case';
import { ContentMakerService } from './domain/content-maker.service';
import { ContentRepository } from './domain/content-repository.interface';
import { HttpContentRepository } from './infrastructure/repositories/http-content.repository';
import { MockContentRepository } from './infrastructure/repositories/mock-content.repository';
import { UrlSanitizerService } from './infrastructure/services/url-sanitizer.service';

/**
 * Factory service for creating ContentMakerUseCase instances
 * This demonstrates how to use dependency injection with hexagonal architecture
 * and how easy it is to swap implementations
 */
@Injectable({
  providedIn: 'root'
})
export class ContentMakerFactory {
  constructor(private urlSanitizerService: UrlSanitizerService) {}

  /**
   * Creates a ContentMakerUseCase with HTTP repository (production)
   */
  createWithHttpRepository(): ContentMakerUseCase {
    const repository: ContentRepository = new HttpContentRepository();
    const service = new ContentMakerService(repository);
    const sanitizer = this.urlSanitizerService.createSanitizerFunction();
    
    return new ContentMakerUseCase(service, sanitizer);
  }

  /**
   * Creates a ContentMakerUseCase with Mock repository (testing/development)
   */
  createWithMockRepository(): ContentMakerUseCase {
    const repository: ContentRepository = new MockContentRepository();
    const service = new ContentMakerService(repository);
    const sanitizer = this.urlSanitizerService.createSanitizerFunction();
    
    return new ContentMakerUseCase(service, sanitizer);
  }

  /**
   * Creates a ContentMakerUseCase with custom repository
   */
  createWithCustomRepository(repository: ContentRepository): ContentMakerUseCase {
    const service = new ContentMakerService(repository);
    const sanitizer = this.urlSanitizerService.createSanitizerFunction();
    
    return new ContentMakerUseCase(service, sanitizer);
  }

  /**
   * Creates a ContentMakerUseCase without URL sanitization
   */
  createWithoutSanitization(): ContentMakerUseCase {
    const repository: ContentRepository = new HttpContentRepository();
    const service = new ContentMakerService(repository);
    
    return new ContentMakerUseCase(service);
  }
}
