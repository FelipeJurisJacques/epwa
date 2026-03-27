import View from './view'
import Builder from './builder'
import Handler from './handler'

interface Path {
    path?: string
    render?: View,
    paths?: string[]
    build?: ((documento: Document) => Builder)
}

interface Constructor {
    paths: Path[]
    handler: Handler<Document, Builder>,
}

export default class Route {
    private current?: Path
    private readonly paths: Path[]
    private readonly handler: Handler<Document, Builder>

    public constructor({ paths, handler }: Constructor) {
        this.paths = paths
        this.handler = handler
    }

    public get base(): HTMLElement {
        return this.element
    }

    public go(path: string): void {
        if (
            !this.current
            || (this.current.path && path !== this.current.path)
            || (this.current.paths && this.current.paths.includes(path))
        ) {
            for (let item of this.paths) {
                if (
                    (item.path && path === item.path)
                    || (item.paths && item.paths.includes(path))
                ) {
                    console.info(`ROUTE: ${path}`)
                    this.render(item)
                    window.history.pushState({}, '', path)
                    break
                }
            }
        }
    }

    public push({
        path,
        render,
        paths,
        build,
    }: Path): void {
        if ((path || paths) && (build || render)) {
            this.paths.push({
                path,
                render,
                paths,
                build,
            })
            this.check()
        }
    }

    public checkPath(path: string): boolean {
        for (let item of this.paths) {
            if (
                (item.path && path === item.path)
                || (item.paths && item.paths.includes(path))
            ) {
                return true
            }
        }
        return false
    }

    private check(): void {
        const path = window.location.pathname
        for (let item of this.paths) {
            if (
                item !== this.current
                && (
                    (item.path && path === item.path)
                    || (item.paths && item.paths.includes(path))
                )
            ) {
                console.info(`ROUTE: ${path}`)
                this.render(item)
                break
            }
        }
    }

    private render(path: Path): void {
        if (!this.current || path !== this.current) {
            this.current = path
            this.element.innerHTML = path.build(window.document).toString()
        }
        // window.document.body.insertAdjacentHTML(
        //     'beforeend',
        //     '<script type="module" src="dist/application.mjs" async></script>'
        // )
    }
}