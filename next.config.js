const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@inlight-media/react-components']);

module.exports = withPlugins([withTM], {});
