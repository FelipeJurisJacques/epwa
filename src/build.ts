import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const SRC_PATH = path.join(__dirname, '../src');
const INDEX_PATH = path.join(SRC_PATH, 'index.ts');

function generateBarrel() {
    console.log('--- Gerando index.ts (Barrel) ---');

    // Função recursiva para achar todos os arquivos .ts
    const getAllFiles = (dir: string): string[] => {
        return fs.readdirSync(dir).flatMap(file => {
            const res = path.resolve(dir, file);
            return fs.statSync(res).isDirectory() ? getAllFiles(res) : res;
        });
    };

    const files = getAllFiles(SRC_PATH)
        .filter(f => f.endsWith('.ts') && !f.endsWith('index.ts'))
        .map(f => {
            // Transforma o caminho absoluto em relativo ao index.ts
            let relative = path.relative(SRC_PATH, f).replace(/\\/g, '/').replace('.ts', '');
            return `export * from './${relative}';`;
        });

    fs.writeFileSync(INDEX_PATH, files.join('\n') + '\n');
    console.log('--- index.ts atualizado com sucesso ---');
}

try {
    generateBarrel();
    console.log('--- Iniciando Compilação TypeScript (tsc) ---');
    // Executa o comando tsc original
    execSync('npx tsc', { stdio: 'inherit' });
    console.log('--- Build finalizado! ---');
} catch (error) {
    console.error('Erro durante o build:', error);
    process.exit(1);
}