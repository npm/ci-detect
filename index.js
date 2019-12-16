module.exports = () =>
  process.env.GERRIT_PROJECT ? 'gerrit'
  : process.env.GITLAB_CI ? 'gitlab'
  : process.env.CIRCLECI ? 'circle-ci'
  : process.env.SEMAPHORE ? 'semaphore'
  : process.env.DRONE ? 'drone'
  : process.env.GITHUB_ACTION ? 'github-actions'
  : process.env.TDDIUM ? 'tddium'
  : process.env.JENKINS_URL ? 'jenkins'
  : process.env['bamboo.buildKey'] ? 'bamboo'
  : process.env.GO_PIPELINE_NAME ? 'gocd'
  // codeship and a few others
  : process.env.CI_NAME ? process.env.CI_NAME
  // test travis last, since many of these mimic it
  : process.env.TRAVIS ? 'travis-ci'
  : process.env.CI === 'true' || process.env.CI === '1' ? 'custom'
  : false
