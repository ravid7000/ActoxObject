declare type ActoxObjectType = object;
declare type ActoxValueType = string | number | boolean | null | object | undefined;
declare type ActoxObjectFunction = Function;
export interface IActoxObject {
    state: ActoxObjectType;
    get: (path: string) => ActoxValueType;
    set: (path: string, value: ActoxValueType) => IActoxObject;
    update: (state: ActoxObjectType) => IActoxObject;
    watch: (path: string, cb: ActoxObjectFunction) => IActoxObject;
    watchAll: (cb: ActoxObjectFunction) => IActoxObject;
    merge: (actoxObject: IActoxObject) => IActoxObject;
}
declare class ActoxObject implements IActoxObject {
    state: ActoxObjectType;
    private watcher;
    constructor(state: ActoxObjectType);
    get(path: string, defaultValue?: ActoxValueType): ActoxValueType;
    set(path: string, value: ActoxValueType): IActoxObject;
    update(state: ActoxObjectType): IActoxObject;
    watch(path: string, cb: ActoxObjectFunction): this;
    watchAll(cb: ActoxObjectFunction): this;
    merge(actoxObject: IActoxObject): IActoxObject;
}
export default ActoxObject;
