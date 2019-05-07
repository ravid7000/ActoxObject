import ActoxObject from './ActoxObject'

const obj = new ActoxObject({ counter: 0 });
const obj1 = new ActoxObject({ cou: 0 });

obj.watch('counter', function() {
    console.log(this)
    console.log('called')
})

obj.watchAll(function(state: object) {
    console.log(state)
    console.log('watch all')
})

window.setTimeout(() => {
    console.log(obj.set('counter', 1).get('counter'))
}, 100)
obj.merge(obj1)
obj.set('listen', 0)

export default ActoxObject;