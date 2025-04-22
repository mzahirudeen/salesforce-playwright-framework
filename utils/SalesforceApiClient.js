const axios = require('axios');
require('dotenv').config();

class SalesforceApiClient {
  constructor() {
    this.baseUrl = process.env.SF_API_URL || 'https://your-instance.salesforce.com/services/data/v60.0';
    this.clientId = process.env.SF_CLIENT_ID;
    this.clientSecret = process.env.SF_CLIENT_SECRET;
    this.username = process.env.SF_USERNAME;
    this.password = process.env.SF_PASSWORD;
    this.token = null;
  }

  async authenticate() {
    const response = await axios.post(
      'https://login.salesforce.com/services/oauth2/token',
      new URLSearchParams({
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username: this.username,
        password: this.password
      })
    );
    this.token = response.data.access_token;
    this.instanceUrl = response.data.instance_url;
  }

  async request(method, endpoint, data = null) {
    if (!this.token) await this.authenticate();
    const url = `${this.instanceUrl}${endpoint}`;
    try {
      const response = await axios({
        method,
        url,
        data,
        headers: { Authorization: `Bearer ${this.token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(`API request failed: ${error.response?.data || error.message}`);
    }
  }

  async createRecord(object, data) {
    return this.request('POST', `/sobjects/${object}`, data);
  }

  async query(soql) {
    return this.request('GET', `/query?q=${encodeURIComponent(soql)}`);
  }
}

module.exports = { SalesforceApiClient };