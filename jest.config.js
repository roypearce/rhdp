/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage-json',
  coverageReporters: ['json'],
  testMatch: ['**/tests/unit/**/*.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
