module.exports = fn => {
  try {
    let ret = fn();

    if (ret && ret.then) {
      return ret.catch(err => err);
    }
  }
  catch (err) {
    return err;
  }

  return null;
};
