interface Tag {
    tag: string,
    children?: Builder[],
    child?: string | Builder,
    attributes?: {
        [key: string]: any,
    },
}

export default class Builder {
    private readonly tag: string
    private readonly attributes?: {
        [key: string]: any,
    }
    private readonly children?: string | Builder | Builder[]

    public constructor({
        tag,
        child,
        children,
        attributes
    }: Tag) {
        this.tag = tag
        if (child) {
            this.children = child
        } else if (children) {
            this.children = children
        }
        if (attributes) {
            this.attributes = attributes
        }
    }

    public toElement(document: Document): HTMLElement {
        const element = document.createElement(this.tag)
        if (this.attributes) {
            for (let [key, value] of Object.entries(this.attributes)) {
                element.setAttribute(key, value)
            }
        }
        if (this.children) {
            element.innerHTML = this.buildChildren()
        }
        return element
    }

    public toString(): string {
        if (this.attributes) {
            let attributes = ''
            for (let [key, value] of Object.entries(this.attributes)) {
                attributes += `${key}="${value}"`
            }
            if (this.children) {
                return `<${this.tag} ${attributes}>${this.buildChildren()}</${this.tag}>`
            } else {
                return `<${this.tag} ${attributes}></${this.tag}>`
            }
        } else if (this.children) {
            return `<${this.tag}>${this.buildChildren()}</${this.tag}>`
        } else {
            return `<${this.tag}></${this.tag}>`
        }
    }

    private buildChildren(): string {
        if (this.children) {
            if (Array.isArray(this.children)) {
                let children = ''
                for (let child of this.children) {
                    children += child.toString()
                }
                return children
            } else if (this.children instanceof Builder) {
                return this.children.toString()
            } else {
                return this.children
            }
        }
        return ''
    }
}