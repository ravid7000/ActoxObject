function ActoxObject(state) {
  this.state = state;
}

ActoxObject.prototype.get = path => {};
ActoxObject.prototype.set = (path, value) => {};
ActoxObject.prototype.watch = (path, cb) => {};

export default ActoxObject;
