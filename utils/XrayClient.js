const axios = require('axios');

class XrayClient {
  constructor() {
    this.baseUrl = process.env.JIRA_URL || 'https://your-jira-instance.atlassian.net';
    this.apiToken = process.env.JIRA_API_TOKEN;
    this.username = process.env.JIRA_USERNAME;
  }

  async getTestCases(projectKey) {
    const response = await axios.get(
      `${this.baseUrl}/rest/raven/1.0/api/test?projectKey=${projectKey}`,
      {
        auth: { username: this.username, password: this.apiToken }
      }
    );
    return response.data;
  }

  async reportTestResult(testExecutionId, testCaseId, status) {
    await axios.post(
      `${this.baseUrl}/rest/raven/1.0/api/testrun`,
      {
        testExecutionId,
        testCaseId,
        status
      },
      {
        auth: { username: this.username, password: this.apiToken }
      }
    );
  }
}

module.exports = { XrayClient };