const { execSync } = require('child_process');
const core = require('@actions/core');

const email = core.getInput('email');
const apiToken = core.getInput('api-token');

try {
  execSync(`cat >~/.netrc <<EOF
  machine api.heroku.com
      login ${email}
      password ${apiToken}
  machine git.heroku.com
      login ${email}
      password ${apiToken}
  EOF`);
  core.setOutput('status', 'Logged successfully');
} catch (error) {
  core.setOutput('status', 'Unable to login');
  core.setFailed(error);
}
