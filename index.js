const { execSync } = require('child_process');
const core = require('@actions/core');

const email = core.getInput('heroku_email');
const apiKey = core.getInput('heroku_api_key');

try {
  execSync(`cat >~/.netrc <<EOF
  machine api.heroku.com
      login ${email}
      password ${apiKey}
  machine git.heroku.com
      login ${email}
      password ${apiKey}
  EOF`);
  core.setOutput('status', 'Logged successfully');
} catch (error) {
  core.setOutput('status', 'Unable to login');
  core.setFailed(error);
}
