export default abstract class View {
    private _window: Window
    private _container: HTMLElement

    public constructor(window: Window, container: HTMLElement) {
        this._window = window
        this._container = container
        this.build()
    }

    protected get window(): Window { return this._window }

    public handler(): void { }
    protected render(): string { return '' }
    protected get stylesheets(): Array<string> { return [] }

    private build(): void {
        for (let stylesheet of this.stylesheets) {
            this.window.document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${stylesheet}" />`)
        }
        this._container.innerHTML = this.render()
        this.handler()
    }

    protected rebuild(): void { this._container.innerHTML = this.render() }
}