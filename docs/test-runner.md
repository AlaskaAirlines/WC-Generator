# Web Component Automated Testing

Components created using the [WC-Generator](https://auro.alaskaair.com/generator) will be configured with testing tools based on [open-wc](https://open-wc.org/docs/testing/testing-package/) recommendations and [modern web test runner](https://modern-web.dev/docs/test-runner/overview/).

## Configuration

[web-test-runner.config.mjs](https://modern-web.dev/docs/test-runner/cli-and-configuration/) contains the configuration used by WTR. The following is an example of the test config contained within the WC-Generator.

```js
export default {
  files: "test/**/*.test.js",
  nodeResolve: true,
  coverageConfig: {
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
};
```

## Running Tests

The `package.json` for generated web components have the following test commands in the scripts block:

```json
"scripts": {
    ...
    "test": "wtr --coverage",
    "test:watch": "wtr --watch",
    ...
}
```

`npm test` will start WTR, run a single execution of the package's tests, and generate a coverage report.


```bash
./auro-test (main) $ npm test

> @aurodesignsystem/[namespace]-[name]@0.0.0 test /Users/[usr]/dir/[namespace]-test
> wtr --coverage


Chrome: |██████████████████████████████| 1/1 test files | 3 passed, 0 failed

Code coverage: 100 %
View full coverage report at coverage/lcov-report/index.html

Finished running tests in 1.7s, all tests passed! 🎉
```
