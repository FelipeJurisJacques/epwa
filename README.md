# INSTALL

git submodule add https://github.com/FelipeJurisJacques/epwa.git engine

docker compose -f ./engine/docker/docker-compose.yaml up

docker exec engine_progressive_web_application_typescript_container npm install;


# RUN

docker compose -f ./engine/docker/docker-compose.yaml up


# BUILD

docker exec engine_progressive_web_application_typescript_container npx tsx /workspace/backend/engine/compiler/build.ts;