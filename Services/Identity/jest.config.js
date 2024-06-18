export default {
    reporters: [
        'default',
        ['jest-html-reporter', {
            outputPath: './tests/reports/report.html',
            pageTitle: 'Identity API Test Report'
        }]
    ],
    globalSetup: './jest.setup.js',
    setupFilesAfterEnv: [
        'jest-extended/all'
    ]
}