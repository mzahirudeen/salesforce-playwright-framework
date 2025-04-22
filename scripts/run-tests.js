const { execSync } = require('child_process');
const yargs = require('yargs');

const argv = yargs
  .option('type', {
    description: 'Test type (ui, api)',
    type: 'string'
  })
  .option('tags', {
    description: 'Test tags (e.g., @smoke, @regression)',
    type: 'string'
  })
  .option('env', {
    description: 'Environment (dev, qa, uat, prod)',
    type: 'string',
    default: 'qa'
  }).argv;

const envFile = `.env.${argv.env}`;
const testDir = argv.type ? `tests/${argv.type}` : 'tests';
const tagFilter = argv.tags ? `--grep "${argv.tags}"` : '';

try {
  console.log(`Running tests for ${argv.env} environment...`);
  execSync(
    `npx playwright test --config=playwright.config.js ${testDir} ${tagFilter}`,
    { stdio: 'inherit', env: { ...process.env, ENV_FILE: envFile } }
  );
} catch (error) {
  console.error('Test execution failed:', error.message);
  process.exit(1);
}