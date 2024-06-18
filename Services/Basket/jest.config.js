export default {
    reporters: [
        'default',
        ['jest-html-reporter', {
            outputPath: './tests/reports/report.html',
            pageTitle: 'Basket API Test Report'
        }]
    ],
    setupFilesAfterEnv: [
        './jest.setup.js'
    ],
    transform: {}
}