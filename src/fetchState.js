let apps = {
  unitTest: {
    helloWorld: { hello: 'world' },
    olaMundo: { ola: 'mundo' },
  },
};

module.exports = (appName, sid) => {
  let app = apps[appName];

  if (!app) {
    throw new Error(`App not found`);
  }

  if (!sid) {
    return { appName, sid: 'newSession' };
  }

  let session = app[sid];

  if (!session) {
    throw new Error(`Session not found`);
  }

  session.appName = appName;
  session.sid = sid;

  return session;
};
