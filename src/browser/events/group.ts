import Listener from './listener'
import Route from '../utils/route'

export default class Group {
    private origin: Route
    private listeners: Listener[]

    public constructor(route: Route, listener: Listener) {
        this.listeners = [
            listener,
        ]
        this.origin = route
        route.root.addEventListener('click', event => {
            for (let listener of this.listeners) {
                listener.handler(event)
            }
        })
    }

    public push(listener: Listener): void {
        this.listeners.push(listener)
    }

    public get route(): Route { return this.route }
}