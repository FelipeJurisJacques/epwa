import Route from './route'
import Builder from './builder'
import Target from '../events/target'
import Signature from '../events/signature'

export default class View {
    private readonly _route: Route
    private readonly _paths: string[]
    private readonly _builder: (documento: Document) => Builder

    public constructor(
        route: Route,
        paths: string | string[],
        render: (documento: Document) => Builder
    ) {
        this._route = route
        this._builder = render
        this._paths = paths instanceof Array ? paths : [
            paths,
        ]
    }

    public get root(): HTMLElement {
        return this._route.base
    }

    public get paths(): string[] {
        return this._paths
    }

    public get builder(): (documento: Document) => Builder {
        return this._builder
    }

    protected listen(query: string): Signature {
        const target = new Target(this)
        target.onQuery(query)
        return new Signature(target)
    }
}

window.addEventListener('popstate', event => {
    if (event.target instanceof Window) {
        Route.go(event.target.location.pathname)
    }
})