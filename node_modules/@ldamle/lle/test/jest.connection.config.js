const {testMatch} = require('./jest.testlib.config');

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/controller/connection.ts'],
    coverageDirectory: 'test/coverage/connection',
    coverageReporters: ['html', 'text'],

    rootDir: '../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/Connection/**/*.test.ts']
};
