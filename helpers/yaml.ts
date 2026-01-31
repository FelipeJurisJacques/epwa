export default abstract class Yaml {
    static decode(text: string) {
        const lines = text.split('\n')
        const result: any = {}
        lines.forEach(line => {
            // Remove espaços e ignora linhas vazias ou comentários
            const trimmed = line.trim()
            if (!trimmed || trimmed.startsWith('#')) return

            // Divide em chave e valor
            const [key, ...valueParts] = trimmed.split(':')
            if (key && valueParts.length > 0) {
                result[key.trim()] = valueParts.join(':').trim()
            }
        })
        return result
    }
}