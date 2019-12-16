# @npmcli/ci-detect

Detect what kind of CI environment the program is in

[![Build Status](https://travis-ci.com/npm/ci-detect.svg?branch=master)](https://travis-ci.com/npm/ci-detect)
[![Coverage Status](https://coveralls.io/repos/github/npm/ci-detect/badge.svg?branch=master)](https://coveralls.io/github/npm/ci-detect?branch=master)

## USAGE

```js
const ciDetect = require('@npmcli/ci-detect')
// false if not in CI
// otherwise, a string indicating the CI environment type
const inCI = ciDetect()
```

## CIs Detected

Returns one of the following strings, or `false` if none match, by looking
at the appropriate environment variables.

* gerrit
* gitlab
* circle-ci
* drone
* github-actions
* tddium
* jenkins
* gocd
* wercker
* netlify
* now
* codeship (or any that set `CI_NAME` environment variable)
* travis-ci
* custom (anything else that sets `CI` environment variable)
