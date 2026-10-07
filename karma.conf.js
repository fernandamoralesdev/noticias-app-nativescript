// (10) Configuración de Karma: Jasmine + Karma JUnit Reporter
// Ejecutar con:  npm run test:unit
// Salida del reporter: reports/junit/test-results.xml
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/**/*.spec.ts'],
    preprocessors: {
      'src/**/*.spec.ts': ['esbuild'],
    },
    esbuild: {
      target: 'es2020',
      tsconfig: './tsconfig.spec.json',
      singleBundle: false,
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('karma-esbuild'),
    ],
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'reports/junit', // carpeta donde se genera el XML
      outputFile: 'test-results.xml',
      useBrowserName: false,
      suite: 'MiProyecto',
    },
    browsers: ['ChromeHeadlessSinSandbox'],
    customLaunchers: {
      // Chrome sin interfaz; --no-sandbox permite correrlo también en CI / contenedores
      ChromeHeadlessSinSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: true,
  })
}
