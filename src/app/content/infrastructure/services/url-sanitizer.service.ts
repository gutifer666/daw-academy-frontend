import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Service for URL sanitization using Angular's DomSanitizer
 * This service is part of the infrastructure layer as it deals with
 * Angular-specific security concerns
 */
@Injectable({
  providedIn: 'root'
})
export class UrlSanitizerService {
  constructor(private readonly domSanitizer: DomSanitizer) {}

  /**
   * Sanitizes a URL for safe use in iframes
   * @param url The URL to sanitize
   * @returns SafeResourceUrl that can be used in Angular templates
   */
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Creates a sanitizer function that can be injected into use cases
   * This allows the use case to remain framework-agnostic while still
   * providing sanitization functionality
   */
  createSanitizerFunction(): (url: string) => SafeResourceUrl {
    return (url: string) => this.sanitizeUrl(url);
  }
}
