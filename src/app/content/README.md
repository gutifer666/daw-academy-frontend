# Content Maker - Hexagonal Architecture Implementation

This module implements a content creation feature using hexagonal architecture principles, providing a pluggable and testable alternative to the existing `iframe-content-view` component.

## Architecture Overview

The implementation follows hexagonal architecture (also known as Ports and Adapters) with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│                 (Angular Components)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           ContentMakerComponent                     │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                         │
│                 (Use Cases & Commands)                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           ContentMakerUseCase                       │   │
│  │           ContentMakerCommand                       │   │
│  │           ContentMakerResult                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Domain Layer                            │
│              (Business Logic & Entities)                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           ContentMakerService                       │   │
│  │           ContentPath (Value Object)                │   │
│  │           ContentSource (Value Object)              │   │
│  │           ContentRepository (Interface)             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                       │
│              (External Dependencies)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           HttpContentRepository                     │   │
│  │           UrlSanitizerService                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Domain Layer (`domain/`)
- **Pure TypeScript** - No framework dependencies
- Contains business logic and domain entities
- Defines interfaces for external dependencies
- **Files:**
  - `ContentPath` - Value object for path validation and parsing
  - `ContentSource` - Value object representing content URLs
  - `ContentRepository` - Interface for content resolution
  - `ContentMakerService` - Domain service with business logic

### 2. Application Layer (`application/content-maker/`)
- **Pure TypeScript** - No framework dependencies
- Orchestrates use cases and application flow
- **Files:**
  - `ContentMakerUseCase` - Main use case orchestrator
  - `ContentMakerCommand` - Input command object
  - `ContentMakerResult` - Output result object

### 3. Infrastructure Layer (`infrastructure/`)
- Implements domain interfaces
- Handles external dependencies and technical concerns
- **Files:**
  - `HttpContentRepository` - HTTP-based content resolution
  - `UrlSanitizerService` - Angular-based URL sanitization

### 4. Presentation Layer (root level)
- **Angular-specific code only**
- User interface and framework integration
- **Files:**
  - `ContentMakerComponent` - Angular component
  - Templates and styles

## Key Benefits

1. **Testability**: Each layer can be tested independently
2. **Flexibility**: Easy to swap implementations (e.g., different content repositories)
3. **Maintainability**: Clear separation of concerns
4. **Framework Independence**: Core business logic is not tied to Angular
5. **Extensibility**: Easy to add new content sources or processing logic

## Usage

The `ContentMakerComponent` can be used as a drop-in replacement for `IframeContentViewComponent`:

```typescript
// In your routing or component usage
<app-content-maker></app-content-maker>
```

## Extending the Architecture

### Adding New Content Sources

1. Create a new repository implementation:
```typescript
export class DatabaseContentRepository implements ContentRepository {
  // Implementation for database-based content
}
```

2. Inject it in the component constructor:
```typescript
const contentRepository = new DatabaseContentRepository();
```

### Adding New Processing Logic

1. Extend the domain service or create new domain services
2. Modify the use case to incorporate new logic
3. No changes needed in presentation layer

## Migration from iframe-content-view

The new implementation provides the same functionality as the original `iframe-content-view` component but with improved architecture. The original component can remain unchanged while this new implementation provides a more maintainable and testable alternative.
