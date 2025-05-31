#!/usr/bin/env node

/**
 * Test runner script for content-maker use case tests
 * 
 * This script provides a convenient way to run the content-maker tests
 * with various options and configurations.
 */

const { execSync } = require('child_process');
const path = require('path');

// Configuration
const TEST_PATTERN = '**/content-maker/**/*.spec.ts';
const COVERAGE_DIR = 'coverage/content-maker';

// Command line arguments
const args = process.argv.slice(2);
const options = {
  coverage: args.includes('--coverage') || args.includes('-c'),
  watch: args.includes('--watch') || args.includes('-w'),
  verbose: args.includes('--verbose') || args.includes('-v'),
  single: args.includes('--single-run') || args.includes('-s'),
  browsers: args.find(arg => arg.startsWith('--browsers='))?.split('=')[1] || 'Chrome'
};

/**
 * Build the ng test command with appropriate options
 */
function buildTestCommand() {
  let command = 'ng test';
  
  // Add test pattern
  command += ` --include="${TEST_PATTERN}"`;
  
  // Add coverage if requested
  if (options.coverage) {
    command += ' --code-coverage';
    command += ` --coverage-dir="${COVERAGE_DIR}"`;
  }
  
  // Add watch mode
  if (options.watch) {
    command += ' --watch=true';
  } else {
    command += ' --watch=false';
  }
  
  // Add single run
  if (options.single) {
    command += ' --single-run=true';
  }
  
  // Add browsers
  command += ` --browsers=${options.browsers}`;
  
  // Add verbose output
  if (options.verbose) {
    command += ' --verbose=true';
  }
  
  return command;
}

/**
 * Print usage information
 */
function printUsage() {
  console.log(`
Content Maker Test Runner

Usage: node run-tests.js [options]

Options:
  -c, --coverage     Generate code coverage report
  -w, --watch        Run tests in watch mode
  -v, --verbose      Enable verbose output
  -s, --single-run   Run tests once and exit
  --browsers=<list>  Specify browsers (default: Chrome)

Examples:
  node run-tests.js                    # Run tests once
  node run-tests.js --coverage         # Run with coverage
  node run-tests.js --watch            # Run in watch mode
  node run-tests.js --coverage --watch # Run with coverage in watch mode
  node run-tests.js --browsers=Chrome,Firefox # Run on multiple browsers

Test Files:
  - content-maker.command.spec.ts
  - content-maker.result.spec.ts  
  - content-maker.use-case.spec.ts

Coverage Target: >90%
  `);
}

/**
 * Main execution function
 */
function main() {
  // Show help if requested
  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    return;
  }
  
  console.log('🧪 Running Content Maker Use Case Tests...\n');
  
  if (options.coverage) {
    console.log('📊 Code coverage enabled');
  }
  
  if (options.watch) {
    console.log('👀 Watch mode enabled');
  }
  
  console.log(`🌐 Browsers: ${options.browsers}`);
  console.log(`📁 Test pattern: ${TEST_PATTERN}\n`);
  
  // Build and execute the command
  const command = buildTestCommand();
  
  if (options.verbose) {
    console.log(`Executing: ${command}\n`);
  }
  
  try {
    execSync(command, { 
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '../../../../..') // Navigate to project root
    });
    
    if (options.coverage && !options.watch) {
      console.log(`\n📊 Coverage report generated in: ${COVERAGE_DIR}`);
      console.log('🎯 Target coverage: >90%');
    }
    
  } catch (error) {
    console.error('❌ Tests failed');
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main();
}

module.exports = {
  buildTestCommand,
  options
};
