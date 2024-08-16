// config-overrides.js
const path = require('path');
const { override, addWebpackAlias, addWebpackExternals } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    stream: path.resolve(__dirname, 'path/to/empty-module.js'), // Use empty module if necessary
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
    util: require.resolve('util/'),
    os: require.resolve('os-browserify/browser'),
    process: require.resolve('process/browser'),
    zlib: require.resolve('browserify-zlib'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    net: false, // Mock net as false
    tls: false, // Mock tls as false
    dns: false, // Mock dns as false
    timers: false, // Mock timers as false
    child_process: false, // Mock child_process as false
    fs: false, // Mock fs as false
    path: false, // Mock path as false
  }),
  addWebpackExternals({
    'crypto': 'crypto-browserify',
    'stream': 'stream-browserify',
    'buffer': 'buffer',
    'util': 'util',
    'os' : 'os-browserify/browser',
    'process' : 'process/browser',
    'zlib' : 'browserify-zlib',
    'http' : 'stream-http',
    'https': 'https-browserify',
    net: false, // Mock net as false
    tls: false, // Mock tls as false
    dns: false, // Mock dns as false
    timers: false,
    child_process: false,
    fs: false,
    path: false,
  })
);