export default {
    reporters: [
        'default',
        ['jest-html-reporter', {
            outputPath: './tests/reports/report.html',
            pageTitle: 'Product API Test Report'
        }]
    ],
    setupFilesAfterEnv: [
        './jest.setup.js',
        'jest-extended/all',
        'jest-sorted'
    ]
}