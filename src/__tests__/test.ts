import ActoxObject from '../index'

const actoxObject = new ActoxObject({})

test('State should be empty', () => {
    expect(actoxObject.state).toEqual({})
})

test('State should be updated', () => {
    actoxObject.update({
        counter: 0
    })
    expect(actoxObject.state).toEqual({counter: 0})
})

test('State should be updated partially, using set', () => {
    actoxObject.set('partial', 0)
    expect(actoxObject.state).toEqual({counter: 0, partial: 0})
})

test('Set deep state', () => {
    const objTemp = new ActoxObject({})
    objTemp.set('a.b.c', 30)
    expect(objTemp.state).toEqual({a: {b: {c: 30}}})
})

test('Get deep state', () => {
    const objTemp = new ActoxObject({})
    objTemp.set('a.b.c', 30)
    expect(objTemp.get('a.b.c')).toEqual(30)
})

test('Get state', () => {
    expect(actoxObject.get('partial')).toEqual(0)
})

test('Set should call watch prop callback', () => {
    actoxObject.watch('test', (state: { test: number }) => {
        expect(state.test).toBe(3)
    })

    actoxObject.set('test', 3)
})

test('State should be merged', () => {
    const objTemp = new ActoxObject({ temp: true })

    objTemp.merge(actoxObject)
    expect(objTemp.state).toEqual({counter: 0, partial: 0, test: 3, temp: true})
})

test('Watch all props', () => {
    const objTemp = new ActoxObject({ temp: true })
    objTemp.watchAll((state: object) => {
        expect(state).toEqual(objTemp.state)
    })

    objTemp.set('temp', false)
    objTemp.set('a.b', true)
})