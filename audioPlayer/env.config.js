var envConfig = {
  log: JSON.parse(process.env.log || '{}'), //must be a string
  API_BASE_URI: process.env.ATG_API_BASE_URI || '',
};

module.exports = envConfig;
