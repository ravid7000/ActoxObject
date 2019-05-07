export function logger(error: string): void {
    console.warn('ActoxObject:', error)
}

export function listener(path: string, watcher: [[string | null, Function]]) {
    for (let i = 0; i < watcher.length; i++) {
        const item = watcher[i]
        if (item[0] === path) {
            item[1].call(this, this.state)
        }
        if (item[0] === null) {
            item[1].call(this, this.state)
        }
    }
}