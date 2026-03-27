import View from '../utils/view'
import Dispatcher from './dispatcher'
import Type from '../enumerators/event'

export default class Target {
    private readonly ownerView: View
    private ownerQuery: null | string
    private ownerTarget: null | HTMLElement

    public constructor(view: View) {
        this.ownerView = view
        this.ownerQuery = null
        this.ownerTarget = null
    }

    public get view(): View { return this.ownerView }

    public onTarget(element: HTMLElement): void {
        this.ownerQuery = null
        this.ownerTarget = element
    }

    public onQuery(query: string): void {
        this.ownerQuery = query
        this.ownerTarget = null
    }

    public handler(event: Event, type: Type, dispatcher: (event: Dispatcher) => void): void {
        if (event.target instanceof HTMLElement) {
            if (this.ownerQuery) {
                if (this.ownerTarget) {
                    if (this.ownerTarget.contains(event.target)) {
                        this.invoke(type, event, event.target, dispatcher)
                    }
                } else {
                    this.invoke(type, event, event.target, dispatcher)
                }
            } else if (this.ownerTarget) {
                if (
                    this.ownerTarget === event.target
                    || this.ownerTarget.contains(event.target)
                ) {
                    this.invoke(type, event, event.target, dispatcher)
                }
            }
        }
    }

    private invoke(
        type: Type,
        event: Event,
        target: HTMLElement,
        dispatcher: (event: Dispatcher) => void
    ): void {
        if (this.ownerQuery) {
            const element = target.closest(this.ownerQuery)
            if (element && element instanceof HTMLElement) {
                console.info(`DISPACH[${type}]`, dispatcher)
                dispatcher(new Dispatcher(event, type, element))
            }
        } else if (this.ownerTarget) {
            console.info(`DISPACH[${type}]`, dispatcher)
            dispatcher(new Dispatcher(event, type, this.ownerTarget))
        }
    }
}