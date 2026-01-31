export default abstract class Tag {
    public static render(tag: string, atributes: object = {}, content: string = ''): string {
        switch (tag) {
            case 'br':
                return '<br>'
            default:
                return `<${tag} ${Object.entries(atributes).map(([
                    key,
                    value,
                ]) => `${key}="${value}"`).join(' ')}>${content}</${tag}>`
        }
    }
}