# Web Component Automated Testing

Components created using the [WC-Generator](https://auro.alaskaair.com/generator) will be configured with testing tools based on [open-wc](https://open-wc.org/docs/testing/testing-package/) recommendations and [modern web test runner](https://modern-web.dev/docs/test-runner/overview/).

The tests are run in a real browser. By default, the test runner will use your computer's [Chrome installation](https://modern-web.dev/guides/test-runner/browsers/).

## Configuration

[web-test-runner.config.mjs](https://modern-web.dev/docs/test-runner/cli-and-configuration/) contains the configuration used by WTR. The following is an example of the test config contained within the WC-Generator.

```js
export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  coverageConfig: {
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
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

```sh
$ npm test

> @aurodesignsystem/[namespace]-[name]@0.0.0 test /Users/[usr]/dir/[namespace]-test
> wtr --coverage


Chrome: |██████████████████████████████| 1/1 test files | 3 passed, 0 failed

Code coverage: 100 %
View full coverage report at coverage/lcov-report/index.html

Finished running tests in 1.7s, all tests passed! 🎉
```

## Troubleshooting

### Windows Subsystem for Linux

When developing on [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/about), you may encounter the following error:

```sh
Failed to launch local browser installed at /mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe. This could be because of a mismatch between the version of puppeteer and Chrome or Chromium. Try updating either of them, or adjust the executablePath option to point to another browser installation. Use the --puppeteer flag to run tests with bundled compatible version of Chromium.

test/component.test.js:

 ❌ connect ECONNREFUSED 127.0.0.1:49515

Chrome: |██████████████████████████████| 1/1 test files | 0 passed, 0 failed
```

To address this error, you will need to install Chrome in your Windows Subsystem for Linux.

```sh
$ wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
$ sudo apt install ./google-chrome-stable_current_amd64.deb
```

After installing you need to add a `CHROME_PATH` environment variable to your default shell scripts, `.bash_profile`, `.bashrc` or `.zshrc`, depending on your setup.

This is required so that the test runner knows to use the WSL Chrome installation versus the Windows installation.

```sh
$ export CHROME_PATH=/usr/bin/google-chrome
```

You may also need to add that line to `.huskyrc` so that the tests successfully run as a commit hook.
