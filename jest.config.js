/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testMatch: [
    "**/tests/unit/**/*.ts"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
};