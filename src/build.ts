import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const SRC_PATH = __dirname;
const BROWSER_PATH = path.join(SRC_PATH, 'browser');
const INDEX_PATH = path.join(SRC_PATH, 'index.ts');

function generateBarrel() {
    console.log('--- Gerando index.ts (Barrel) ---');

    // Função recursiva para achar todos os arquivos .ts
    const getAllFiles = (dir: string): string[] => {
        if (!fs.existsSync(dir)) return [];
        return fs.readdirSync(dir).flatMap(file => {
            const res = path.resolve(dir, file);
            return fs.statSync(res).isDirectory() ? getAllFiles(res) : res;
        });
    };

    const files = getAllFiles(BROWSER_PATH)
        .filter(f => f.endsWith('.ts') && !f.endsWith('index.ts'))
        .map(f => {
            // Transforma o caminho absoluto em relativo ao SRC_PATH para exportar com o prefixo 'browser/'
            let relative = path.relative(SRC_PATH, f).replace(/\\/g, '/').replace(/\.ts$/, '');
            return `export * from './${relative}';`;
        });

    fs.writeFileSync(INDEX_PATH, files.join('\n') + '\n');
    console.log('--- index.ts atualizado com sucesso ---');
}

try {
    generateBarrel();
} catch (error) {
    console.error('Erro durante o build:', error);
    process.exit(1);
}