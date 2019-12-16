const t = require('tap')

const detect = require('../')

const env = (t, key, val) => {
  const orig = process.env[key]
  t.teardown(() => {
    if (orig)
      process.env[key] = orig
    else
      delete process.env[key]
  })
  if (val)
    process.env[key] = val
  else
    delete process.env[key]
}

const test = (key, val, expect) => {
  t.test(expect || 'false', t => {
    // many of them copy these, set for all of them except 'not in CI'
    // where we unset it so that our own tests don't fail in CI
    if (key && key !== 'CI' && key !== 'BUILDER_OUTPUT' && key !== 'CODEBUILD_SRC_DIR') {
      env(t, 'CI', '1')
      env(t, 'TRAVIS', '1')
    } else {
      env(t, 'CI', '')
      env(t, 'TRAVIS', '')
    }
    env(t, key, val)
    t.equal(detect(), expect)
    t.end()
  })
}

test('GERRIT_PROJECT', '1', 'gerrit')
test('GITLAB_CI', '1', 'gitlab')
test('CIRCLECI', '1', 'circle-ci')
test('SEMAPHORE', '1', 'semaphore')
test('DRONE', '1', 'drone')
test('GITHUB_ACTION', '1', 'github-actions')
test('TDDIUM', '1', 'tddium')
test('JENKINS_URL', '1', 'jenkins')
test('WERCKER', '1', 'wercker')
test('NETLIFY', '1', 'netlify')
test('NOW_GITHUB_DEPLOYMENT', '1', 'now-github')
test('GITLAB_DEPLOYMENT', '1', 'now-gitlab')
test('BITBUCKET_DEPLOYMENT', '1', 'now-bitbucket')
test('bamboo.buildKey', '1', 'bamboo')
test('GO_PIPELINE_NAME', '1', 'gocd')
test('CI_NAME', 'foobar', 'foobar')
test('TRAVIS', '1', 'travis-ci')
test('CI', 'true', 'custom')
test('CI', '1', 'custom')
test('', '', false)
test('APPVEYOR', '1', 'appveyor')
test('CODEBUILD_SRC_DIR', '/some/path', 'aws-codebuild')
test('BUILDER_OUTPUT', '/builder/output', 'builder')
