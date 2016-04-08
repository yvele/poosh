# Todo list

## poosh-cli

- Confirmation? (yes/no)
- Init? --init
- Set config path? (-c, --config <path> defaults to ./poosh.json5)
- Delete only ?
- Use collect form for plugins: --plugin --plugin ?

## poosh-core

- Each: match + ignore:true = file is ignored (not deleted) ?
- Option validation dedicated error with nice messages (+cli)
- Options presets
- Config path resolve
- Config cache location + file (resolve relative to config file (or cwd))
- Config possible in package.json as eslint do (an .eslintrc.* file or an eslintConfig field in a package.json)
   - https://github.com/eslint/eslint/blob/master/conf/cli-options.js
- Add tests on cache & config files resolution

## poosh-plugin-s3

- Add S3 required credentials to the doc (readme)
- Add remote.endpoint (or .absoluteUrl ?)

## internal

- Const nazification?
- Use bluebird via babel
- Use private fields? https://github.com/zenparsing/es-abstract-refs
- ValidationError (that can be filtered in cli, etc..)
- Code coverage does not take all src into account
   - http://stackoverflow.com/questions/33621079/running-mocha-istanbul-babel
- Walk using https://github.com/jprichardson/node-klaw ?
