| type | description |
|---|---|
| build | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| ci | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| docs | Documentation only changes |
| feat | A new feature (this correlates with `MINOR` in semantic versioning) |
| fix | A bug fix (this correlates with `PATCH` in semantic versioning) |
| perf | A code change that improves performance |
| BREAKING CHANGE | A code change that is not backwards compatible (correlating with `MAJOR` in semantic versioning) |
| refactor | A code change that neither fixes a bug nor adds a feature |
| style | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| test | Adding missing tests or correcting existing tests  |

It is considered best practice to group multiple commits into a release. For a versioned update, be sure that your series of commits include either `feat` or `fix`. For a `MAJOR` release, any commit can be accompanied by a `BREAKING CHANGE` comment.
