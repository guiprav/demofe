let fetchState = require('./fetchState');

module.exports = (appName, sid, fn) => {
  return fn(fetchState(appName, sid));
};
