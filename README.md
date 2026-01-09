git submodule add https://github.com/FelipeJurisJacques/epwa.git engine

# INSTALL
docker exec engine_progressive_web_application_typescript_container npm install;
docker exec engine_progressive_web_application_typescript_container npx tsx /workspace/engine/compiler/build.ts;