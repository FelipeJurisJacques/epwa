export default abstract class Manifest {
    private static data: any

    public static async getAssets(): Promise<any> {
        const data = await this.getData()
        return data.assets ? data.assets : {}
    }

    private static async getData(): Promise<any> {
        if (!Manifest.data) {
            const response = await fetch(`${window.location.origin}/manifest.json`)
            Manifest.data = await response.json()
        }
        return Manifest.data
    }
}