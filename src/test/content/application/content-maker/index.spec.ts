/**
 * Test suite index for content-maker application layer
 * 
 * This file imports all test suites for the content-maker use case
 * to ensure they are included in the test runner.
 */

// Import all test suites
import './content-maker.command.spec';
import './content-maker.result.spec';
import './content-maker.use-case.spec';

/**
 * Test Suite Summary:
 * 
 * 1. ContentMakerCommand Tests:
 *    - Valid command creation scenarios
 *    - Invalid parameter validation
 *    - Edge cases and immutability
 * 
 * 2. ContentMakerResult Tests:
 *    - Success and failure result creation
 *    - Static factory methods
 *    - Computed properties (isSuccess, isFailure)
 *    - Edge cases with null/undefined values
 * 
 * 3. ContentMakerUseCase Tests:
 *    - Successful execution with/without sanitization
 *    - Error handling for various exception types
 *    - Path validation functionality
 *    - Integration scenarios and state isolation
 *    - Edge cases and boundary conditions
 * 
 * Coverage Goals:
 * - >90% code coverage for all application layer components
 * - All public methods and properties tested
 * - Error paths and edge cases covered
 * - Dependency isolation through mocking
 */
