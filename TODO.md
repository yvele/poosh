# TODO

## poosh-cli

- Confirmation? (yes/no)
- Init? --init
- Set config path? (-c, --config <path> defaults to ./poosh.json5)
- Delete only ?
- Use collect form for plugins: --plugin --plugin ?

## poosh-core

- Each: match + ignore:true = file is ignored (not deleted) ?
- Option validation dedicated error with nice messages (+cli)
- Config path resolve
- Config cache location + file (resolve relative to config file (or cwd))
- Config possible in package.json as eslint do (an .eslintrc.* file or an eslintConfig field in a package.json)
   - https://github.com/eslint/eslint/blob/master/conf/cli-options.js
- Add tests on cache & config files resolution
- Switch from NeDB to LokiJS (lighter footprint) ?
- Add support for month and week units in duration parsing.
   - See https://github.com/rauchg/ms.js/issues/57
   - See https://github.com/yvele/poosh/issues/2

## poosh-plugin-s3

- Add S3 required credentials to the doc (readme)
- Add remote.endpoint (or .absoluteUrl ?)
- AWS SDK (> v2.3.0) native support for promises https://blogs.aws.amazon.com/javascript/post/Tx3BZ2DC4XARUGG/Support-for-Promises-in-the-SDK

## local cache

- Take poosh environment into account

## internal

- Walk using https://github.com/jprichardson/node-klaw ?
