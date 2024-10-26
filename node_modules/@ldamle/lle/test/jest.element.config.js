const {testMatch} = require('./jest.testlib.config');

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/controller/element.ts'],
    coverageDirectory: 'test/coverage/element',
    coverageReporters: ['html', 'text'],

    rootDir: '../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/Element/**/*.test.ts']
};
