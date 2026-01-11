import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'

const base = '/workspace'

if (fs.existsSync(`${base}/public/assets/videos/`)) {
    const videos = fs.readdirSync(`${base}/public/assets/videos/`)
    if (!fs.existsSync(`${base}/public/assets/thumbnails/`)) {
        fs.mkdirSync(`${base}/public/assets/thumbnails/`)
    }
    for (let asset of videos) {
        if (asset.endsWith('.mp4')) {
            const handler = ffmpeg(`${base}/public/assets/videos/${asset}`)
            handler.on('end', () => {
                console.log(`Frame de capa gerado para ${asset}`)
            })
            handler.screenshots({
                overwrite: true,
                timestamps: ['00:00:01'],
                filename: `${asset.split('.')[0]}.jpg`,
                folder: `${base}/public/assets/thumbnails/`,
            })
        }
    }
}

function readPath(path: string): Array<string> {
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            const result = []
            const assets = fs.readdirSync(path)
            for (let asset of assets) {
                for (let file of readPath(`${path}/${asset}`)) {
                    result.push(file)
                }
            }
            return result
        } else {
            path = path.substring(path.indexOf('/public/') + 8)
            // return [
            //     `  ${path.split('.').shift()?.replaceAll('/', '_').replace(/[^a-zA-Z0-9_]/g, '').toUpperCase()}: '/${path}',\r\n`
            // ]
            return [
                `/${path}`
            ]
        }
    } else {
        return []
    }
}

const paths = {}
const assets = fs.readdirSync(`${base}/public/assets/`)
for (let asset of assets) {
    const path = `${base}/public/assets/${asset}`
    if (fs.statSync(path).isDirectory()) {
        const values = readPath(path)
        if (values.length) {
            paths[asset] = values
        }
    }
}
try {
    const manifest = fs.existsSync(
        `${base}/public/manifest.json`
    ) ? JSON.parse(fs.readFileSync(
        `${base}/public/manifest.json`,
        'utf-8'
    )) : {}
    manifest.assets = paths
    fs.writeFileSync(
        `${base}/public/manifest.json`,
        JSON.stringify(manifest, null, 2),
        'utf8'
    )
    console.log('Enumerador de assets construido')
} catch (error) {
    console.error('Erro ao escrever o enumerador de assets:', error)
}