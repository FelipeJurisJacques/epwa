Esse projeto é uma engine para criação de Progressive Web Applications (PWA) dedicado a compilar typescript para java script reduzindo os módulos para poucos arquivos atravéz do rollup.

# INSTALAÇÃO
git submodule add https://github.com/FelipeJurisJacques/epwa.git engine

docker compose -f ./engine/docker/docker-compose.yaml up

docker exec engine_progressive_web_application_typescript_container npm install;


# EXECUTAR
docker compose -f ./engine/docker/docker-compose.yaml up


# COMPILAR
docker exec engine_progressive_web_application_typescript_container npm run build;

docker exec engine_progressive_web_application_typescript_container npx tsx /workspace/backend/engine/compiler/build.ts;


## BIBLIOTECAS UTILIZADAS
- Rollup (https://github.com/rollup/rollup)
- TypeScript (https://github.com/microsoft/TypeScript)
