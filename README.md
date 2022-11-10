# @npmcli/ci-detect

Detect what kind of CI environment the program is in

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

* Anything that sets the `CI_NAME` environment variable will return the
  value as the result.  (This is how CodeShip is detected.)
* `'aws-codebuild'` AWS CodeBuild
* `'azure-pipelines'` Azure Pipelines
* `'bamboo'` Bamboo
* `'bitbucket-pipelines'` Bitbucket Pipelines
* `'bitrise'` Bitrise
* `'buddy'` Buddy
* `'builder'` Google Cloud Builder - This one is a bit weird.  It
    doesn't really set anything that can be reliably detected except
    `BUILDER_OUTPUT`, so it can get false positives pretty easily.
* `'buildkite'` Buildkite
* `'circleci'` Circle-CI
* `'cirrus'` Cirrus CI
* `'codeship'` CodeShip
* `'custom'` anything else that sets `CI` environment variable to either
    `'1'` or `'true'`.
* `'drone'` Drone
* `'dsari'` dsari CI
* `'gerrit'` Gerrit
* `'github-actions'` GitHub Actions
* `'gitlab'` GitLab
* `'gocd'` GoCD
* `'heroku'` Heroku
* `'hudson'` Hudson CI
* `'jenkins'` Jenkins
* `'magnum'` Magnum CI
* `'netlify'` Netlify
* `'nevercode'` Nevercode
* `'now'` Zeit.co's Now service, but not GitHub/BitBucket/GitLab
* `'now-bitbucket'` Zeit.co's Now for BitBucket deployment service
* `'now-github'` Zeit.co's Now for GitHub deployment service
* `'now-gitlab'` Zeit.co's Now for GitLab deployment service
* `'render'` Render CI
* `'sail'` Sail CI
* `'screwdriver'` Screwdriver CI
* `'semaphore'` Semaphore
* `'shippable'` Shippable
* `'strider'` Strider CI
* `'taskcluster'` Mozilla Taskcluster
* `'tddium'` TDDium
* `'teamcity'` TeamCity
* `'travis-ci'` Travis-CI - A few other CI systems set `TRAVIS=1` in the
    environment, because devs use that to indicate "test mode", so this
    one can get some false positives, and is tested later in the process
    to minimize this effect.
* `'vercel'` Vercel
* `'vercel-bitbucket'` Vercel Bitbucket
* `'vercel-github'` Vercel GitHub
* `'vercel-gitlab'` Vercel Gitlab
* `'wercker'` Oracle Wercker
* `'woodpecker'` Woodpecker CI

## Caveats

Since any program can set or unset whatever environment variables they
want, this is not 100% reliable.

Also, if your program does different behavior in CI/test/deployment than
other places, then there's a good chance that you're doing something
wrong!

But, for little niceties like setting colors or other output parameters,
or logging and that sort of non-essential thing, this module provides a
way to tweak without checking a bunch of things in a bunch of places.
Mostly, it's a single place to keep a note of what CI system sets which
environment variable.
