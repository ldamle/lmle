const {testMatch} = require('./jest.testlib.config');

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/controller/elementGraph.ts'],
    coverageDirectory: 'test/coverage/elementgraph',
    coverageReporters: ['html', 'text'],

    rootDir: '../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/test/ElementGraph/**/*.test.ts']
};
