const {testMatch} = require('./jest.testlib.config');

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/*.ts'],
    coverageDirectory: 'test/coverage/general',
    coverageReporters: ['html', 'text'],

    rootDir: '../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/general/**/*.test.ts']
};
