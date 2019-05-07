import get from 'lodash/get'
import set from 'lodash/set'
import assign from 'lodash/assign'
import merge from 'lodash/merge'
import isFunction from 'lodash/isFunction'
import { logger, listener } from './utils';

type ActoxObjectType = object;
type ActoxValueType = string | number | boolean | null | object | undefined;
type ActoxObjectFunction = Function;
type WatcherListType = [string | null, ActoxObjectFunction]
type WatcherType = Array<WatcherListType>

export interface IActoxObject {
  state: ActoxObjectType;
  get: (path: string) => ActoxValueType;
  set: (path: string, value: ActoxValueType) => IActoxObject;
  update: (state: ActoxObjectType) => IActoxObject;
  watch: (path: string, cb: ActoxObjectFunction) => IActoxObject;
  watchAll: (cb: ActoxObjectFunction) => IActoxObject;
  merge: (actoxObject: IActoxObject) => IActoxObject;
}

class ActoxObject implements IActoxObject {
  state = assign({}, null)
  private watcher: WatcherType = []

  constructor(state: ActoxObjectType) {
    this.state = assign({}, state)
  }

  get (path: string, defaultValue?: ActoxValueType): ActoxValueType {
    try {
      return get(this.state, path, defaultValue)
    } catch(err) {
      logger(err.message)
      return null
    }
  }

  set (path: string, value: ActoxValueType): IActoxObject {
    try {
      set(this.state, path, value)
      listener.call(this, path, this.watcher)
      return this
    } catch(err) {
      logger(err.message)
      return this
    }
  };

  update (state: ActoxObjectType): IActoxObject {
    try {
      this.state = assign(state)
      return this
    } catch(err) {
      logger(err.message)
      return this
    }
  };

  watch (path: string, cb: ActoxObjectFunction) {
    try {
      if (!isFunction(cb)) {
        throw new TypeError('Callback must be a function instead of ' + typeof cb);
      }
      if (typeof path !== 'string') {
        throw new TypeError('Path/Key must be typeof string instead of ' + typeof cb);
      }
      this.watcher.push([path, cb])
      return this
    } catch(err) {
      logger(err.message)
      return this
    }
  };

  watchAll (cb: ActoxObjectFunction) {
    try {
      if (!isFunction(cb)) {
        throw new TypeError('Callback must be a function instead of ' + typeof cb);
      }
      this.watcher.push([null, cb])
      return this
    } catch(err) {
      logger(err.message)
      return this
    }
  };

  merge (actoxObject: IActoxObject): IActoxObject {
    try {
      if (!get(actoxObject, 'state')) {
        throw new TypeError('Object is not instance of ActoxObject');
      }
      this.state = merge(this.state, actoxObject.state)
      return this
    } catch(err) {
      logger(err.message)
      return this
    }
  }
}

export default ActoxObject;
