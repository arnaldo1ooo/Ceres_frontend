const PROXY_CONFIG = [
  {
    context: ['/ceres-api'],
    target: 'http://localhost:8180/',
    secure: false,
    loglevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
