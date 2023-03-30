const {spawnSync} = require('child_process');

const toSyncPkgs = [
  "@umijs/es-module-parser",
  "@umijs/es-module-parser-darwin-arm64",
  "@umijs/es-module-parser-darwin-x64",
  "@umijs/es-module-parser-linux-arm-gnueabihf",
  "@umijs/es-module-parser-linux-arm64-gnu",
  "@umijs/es-module-parser-linux-arm64-musl",
  "@umijs/es-module-parser-linux-x64-gnu",
  "@umijs/es-module-parser-linux-x64-musl",
  "@umijs/es-module-parser-win32-arm64-msvc",
  "@umijs/es-module-parser-win32-x64-msvc"
]

spawnSync("tnpm", ["sync", ...toSyncPkgs], { stdio:"inherit", })