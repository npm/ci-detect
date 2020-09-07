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

// delete to verify that heroku test doesn't bork if node env missing
delete process.env.NODE
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
test('VERCEL_GITHUB_DEPLOYMENT', '1', 'vercel-github')
test('VERCEL_GITLAB_DEPLOYMENT', '1', 'vercel-gitlab')
test('VERCEL_BITBUCKET_DEPLOYMENT', '1', 'vercel-bitbucket')
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
test('SYSTEM_TEAMFOUNDATIONCOLLECTIONURI', '1', 'azure-pipelines')
test('BITRISE_IO', '1', 'bitrise')
test('BUDDY_WORKSPACE_ID', '1', 'buddy')
test('BUILDKITE', '1', 'buildkite')
test('CIRRUS_CI', '1', 'cirrus')
test('DSARI', '1', 'dsari')
test('STRIDER', '1', 'strider')
test('TASKCLUSTER_ROOT_URL', '1', 'taskcluster')
test('HUDSON_URL', '1', 'hudson')
test('NOW_BUILDER', '1', 'now')
test('VERCEL_URL', 'my-site-7q03y4pi5.vercel.app', 'vercel')
test('MAGNUM', '1', 'magnum')
test('NEVERCODE', '1', 'nevercode')
test('RENDER', '1', 'render')
test('SAIL_CI', '1', 'sail')
test('SHIPPABLE', '1', 'shippable')
test('NODE', '/usr/local/.heroku/node/bin/node', 'heroku')
