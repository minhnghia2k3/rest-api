/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Create test file with .test.ts extension
  testMatch: ['**/**/*.test.ts'],
  // Indicates whether each individual test should be reported during the run.
  // All errors will also be shown on the bottom after execution.
  verbose: true,
  // Force exit after all tests have completed.
  forceExit: true,
  // Automatically clear mock calls, instances, contexts, and result before every test.
  // clearMocks: true,
};