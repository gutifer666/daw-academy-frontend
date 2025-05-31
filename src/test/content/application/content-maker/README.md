# Content Maker Use Case Tests

This directory contains comprehensive unit tests for the content-maker use case application layer, following hexagonal architecture principles.

## Test Structure

```
src/test/content/application/content-maker/
├── content-maker.command.spec.ts     # Command object tests
├── content-maker.result.spec.ts      # Result object tests
├── content-maker.use-case.spec.ts    # Use case orchestrator tests
├── index.spec.ts                     # Test suite index
└── README.md                         # This documentation
```

## Test Coverage

### ContentMakerCommand Tests (`content-maker.command.spec.ts`)

**Scenarios Covered:**
- ✅ Valid command creation with required parameters
- ✅ Default sanitize parameter behavior
- ✅ Explicit sanitize parameter values (true/false)
- ✅ Complex paths with special characters
- ✅ Invalid parameter validation (empty, null, undefined)
- ✅ Edge cases (whitespace, single characters)
- ✅ Immutability verification

**Test Count:** 12 tests

### ContentMakerResult Tests (`content-maker.result.spec.ts`)

**Scenarios Covered:**
- ✅ Constructor with all parameters
- ✅ Constructor with minimal parameters
- ✅ Static factory methods (success/failure)
- ✅ Computed properties (isSuccess/isFailure)
- ✅ Edge cases (null/undefined values)
- ✅ Property consistency validation

**Test Count:** 15 tests

### ContentMakerUseCase Tests (`content-maker.use-case.spec.ts`)

**Scenarios Covered:**
- ✅ Successful execution with sanitization
- ✅ Successful execution without sanitization
- ✅ Execution without sanitizer provided
- ✅ Complex path handling
- ✅ Error handling for various exception types
- ✅ Sanitizer error handling
- ✅ Path validation functionality
- ✅ Edge cases (empty URLs, null returns)
- ✅ Integration scenarios
- ✅ State isolation verification

**Test Count:** 20 tests

## Testing Principles

### 1. AAA Pattern (Arrange, Act, Assert)
All tests follow the Arrange-Act-Assert pattern for clarity:

```typescript
it('should create command with path and default sanitize value', () => {
  // Arrange
  const path = 'programacion/ut1';

  // Act
  const command = new ContentMakerCommand(path);

  // Assert
  expect(command.path).toBe(path);
  expect(command.sanitize).toBe(true);
});
```

### 2. Dependency Isolation
All external dependencies are mocked using Jasmine spies:

```typescript
beforeEach(() => {
  mockContentMakerService = jasmine.createSpyObj('ContentMakerService', [
    'createContentSource',
    'validatePath'
  ]);
  mockUrlSanitizer = jasmine.createSpy('urlSanitizer');
});
```

### 3. Hexagonal Architecture Compliance
- Tests focus only on application layer logic
- No Angular dependencies in test code
- Domain layer dependencies are mocked
- Infrastructure concerns are abstracted away

### 4. Comprehensive Error Handling
Tests cover various error scenarios:
- Service throwing Error objects
- Service throwing non-Error objects
- Service throwing undefined/null
- Sanitizer throwing errors
- Validation failures

### 5. Edge Case Coverage
Tests include boundary conditions:
- Empty strings and whitespace
- Null and undefined values
- Complex paths with special characters
- Multiple consecutive calls
- State isolation verification

## Running the Tests

### Prerequisites
- Karma test runner configured
- Jasmine testing framework
- Angular testing utilities (if needed)

### Commands
```bash
# Run all content-maker tests
ng test --include="**/content-maker/**/*.spec.ts"

# Run specific test file
ng test --include="**/content-maker.use-case.spec.ts"

# Run with coverage
ng test --code-coverage --include="**/content-maker/**/*.spec.ts"
```

### Expected Coverage
- **Target:** >90% code coverage
- **Lines:** All public methods and properties
- **Branches:** All conditional logic paths
- **Functions:** All exported functions and methods

## Test Data Patterns

### Valid Test Paths
- `'programacion/ut1'`
- `'sistemas-informaticos/ut5'`
- `'desarrollo-web-en-entorno-cliente/ut2'`
- `'bases-de-datos/ut3'`

### Invalid Test Paths
- `''` (empty string)
- `'   '` (whitespace only)
- `'invalid-format'` (missing slash)
- `'too/many/segments'` (too many segments)

### Test URLs
- `'https://example.com/content'`
- `'https://gutifer666.github.io/daw-chat/programacion/ut1'`
- `''` (empty URL for edge cases)

## Maintenance Guidelines

### Adding New Tests
1. Follow the existing naming convention
2. Use descriptive test names that explain the scenario
3. Group related tests in `describe` blocks
4. Include both positive and negative test cases
5. Mock all external dependencies

### Updating Tests
1. Update tests when use case logic changes
2. Maintain test isolation and independence
3. Ensure all edge cases remain covered
4. Update documentation when test structure changes

### Best Practices
- Keep tests focused and atomic
- Use meaningful variable names
- Include comments for complex test scenarios
- Verify both success and failure paths
- Test error messages and result properties
