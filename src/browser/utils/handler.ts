interface Midleware<T, U> {
    path?: string
    middleware: (argument: T, next: Function) => U
}

export default class Handler<T, U> {
    private index: number
    private readonly middlewares: Midleware<T, U>[]

    public constructor(middlewares?: Midleware<T, U>[]) {
        this.index = 0
        this.middlewares = middlewares ?? []
    }

    public push(midleware: Midleware<T, U>): void {
        this.middlewares.push(midleware)
    }

    public pop(): void {
        this.middlewares.pop()
    }

    public shift(): void {
        this.middlewares.shift()
    }

    public unshift(midleware: Midleware<T, U>): void {
        this.middlewares.unshift(midleware)
    }

    public clear(): void {
        this.middlewares.length = 0
    }

    public remove(path: string): void {
        for (let i = 0; i < this.middlewares.length; i++) {
            if (this.middlewares[i].path === path) {
                this.middlewares.splice(i, 1)
                break
            }
        }
    }

    public replace(path: string, midleware: Midleware<T, U>): void {
        for (let i = 0; i < this.middlewares.length; i++) {
            if (this.middlewares[i].path === path) {
                this.middlewares[i] = midleware
                break
            }
        }
    }

    public handler(argument: T, event: (argument: T) => U): U {
        if (this.middlewares.length > this.index) {
            try {
                return this.middlewares[(this.middlewares.length - this.index++) - 1].middleware(argument, () => {
                    return this.handler(argument, event)
                })
            } catch (error) {
                this.index = 0
                throw error
            }
        }
        this.index = 0
        return event(argument)
    }
}